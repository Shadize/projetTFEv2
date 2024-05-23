import {
  AfterViewInit,
  Component, computed,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit, Signal,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {Surface, SurfaceCell, SurfaceCoordinate, SurfaceDefinition, SurfaceFormKey} from '../../data';
import {
  AppRoutes,
  CardHeaderComponent, ConfirmDialogComponent,
  DataTableComponent,
  DataTableConfig,
  FormControlSimpleConfig,
  FormError, handleFormChange,
  handleFormError,
  InputType,
  LabelWithParamPipe,
  positiveNumberValidator
} from '@shared';
import {
  Stock,
  ShelveUtilsService,
  ShelveKey,
  Shelve,
  StockKey,
  StockCreatePayload,
  StockUtilsService, StockService
} from '@shelve-feature';
import {Section} from '@core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {ApiResponse} from '@api';

@Component({
  selector: 'app-shelve-admin-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LabelWithParamPipe,
    TranslateModule,
    DataTableComponent,
    CardHeaderComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './shelve-admin-form.component.html',
  styleUrl: './shelve-admin-form.component.scss'
})
export class ShelveAdminFormComponent implements OnInit, AfterViewInit {
  @Input({required: true}) stock!: Stock;
  @ViewChild('table')
  public table!: ElementRef;
  @ViewChild('cell')
  public cell!: ElementRef;
  public router: Router = inject(Router);
  public widthCell: number = 0;
  public shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  public stockUtils: StockUtilsService = inject(StockUtilsService);
  public stockService: StockService = inject(StockService);
  public shelveFormGroup!: FormGroup;
  public shelveFormConfig: FormControlSimpleConfig[] = [];
  public data$: WritableSignal<Surface> = signal({nbRows: 0, nbCells: 0, rows: []});
  public errors$: WritableSignal<FormError[]> = signal([]);
  public shelveErrors$: WritableSignal<FormError[]> = signal([]);
  public editionMode$: WritableSignal<boolean> = signal(false);
  public shelveAreas$: WritableSignal<Shelve[]> = signal(this.stock?.shelves ?? []);
  public surfaceCoordinate$: WritableSignal<SurfaceCoordinate> = signal({
    maximalRow: -1,
    minimalRow: -1,
    minimalCell: -1,
    maximalCell: -1
  });
  public shelveDataTableConfig$: Signal<DataTableConfig> = computed(() => this.shelveUtils.getAdminDataTableConfig(this.shelveAreas$()))
  public formGroup!: FormGroup;
  public formConfigs: FormControlSimpleConfig[] = [];
  public destroyRef: DestroyRef = inject(DestroyRef);
  public translateKey: string = 'admin-feature-shelve.table.label.';

  ngOnInit() {
    this.initFormGroup();
    this.initShelveCreateFormGroup();
  }
  ngAfterViewInit() {
    this.onResize();
  }

  public cancel(): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVES]).then();
  }

  public save(): void {
    let obs: Observable<Stock>;
    if (this.stock.isEmpty) {
      obs = this.stockService.create(this.stockUtils.genCreatePayload({
        ...this.formGroup.value,
        shelves: this.shelveAreas$()
      }))
    } else {
      obs = this.stockService.update(this.stockUtils.genUpdatePayload({
        ...this.stock,
        ...this.formGroup.value,
        shelves: this.shelveAreas$()
      }));
    }
    obs.pipe(
      tap((stock: Stock) => {
        if (!stock.isEmpty) {
          this.cancel();
        }
      }))
      .subscribe();
  }

  public generateSurface(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.data$.set({
      nbRows: Math.ceil(this.formConfigs[2].formControl.value / this.formConfigs[3].formControl.value),
      nbCells: Math.ceil(this.formConfigs[1].formControl.value / this.formConfigs[3].formControl.value),
      rows: [...Array(Math.ceil(this.formConfigs[2].formControl.value / this.formConfigs[3].formControl.value)).keys()].map((row) => (
        {
          index: row,
          cells: [...Array(Math.ceil(this.formConfigs[1].formControl.value / this.formConfigs[3].formControl.value)).keys()].map((cell) => (
            {
              rowIndex: row,
              index: cell,
              str: `${row}-${cell}`,
              selected: false
            }
          ))
        }))
    });
    if (!this.stock.isEmpty) {
      this.shelveAreas$.set(this.stock.shelves);
    }

  }

  public onResize(): void {
    if(this.cell?.nativeElement){
    this.widthCell = this.cell.nativeElement.offsetWidth;
    this.shelveAreas$.set(
      this.shelveAreas$().map((item) => {
        const minimalItem = document.getElementById(item.startY + '-' + item.startX);
        return {
          ...item,
          width: (minimalItem!.offsetWidth * (item.endX + 1 - item.startX)) + 'px',
          height: (minimalItem!.offsetWidth * (item.endY + 1 - item.startY)) + 'px',
          top: minimalItem!.offsetTop + 'px',
          left: minimalItem!.offsetLeft + 'px'
        }
      })
    )

    }
  }

  public goEditionMode(go: boolean): void {
    this.editionMode$.set(go);
    if (!go) {
      this.resetForm();
    }
  }

  public validate(): void {
    const coordinate = this.surfaceCoordinate$();
    const minimalItem = document.getElementById(coordinate.minimalRow + '-' + coordinate.minimalCell);

    let newAreas: Shelve[] = Array(parseInt(this.shelveFormGroup.get(ShelveKey.FLOOR)!.value, 10)).fill(0).map((key, index) => ({
      floor: (index + 1).toString(),
      nbItemsMax: 0,
      id: '',
      isEmpty: false,
      location: '',
      rack: this.shelveFormGroup.get(ShelveKey.RACK)!.value,
      section: Section.WOOD,
      str: this.shelveFormGroup.get(ShelveKey.RACK)!.value,
      background: this.shelveFormGroup.get(ShelveKey.BACKGROUND_COLOR)!.value,
      color: this.invertHex(this.shelveFormGroup.get(ShelveKey.BACKGROUND_COLOR)!.value.replace('#', '')),
      startX: coordinate.minimalCell,
      startY: coordinate.minimalRow,
      endX: coordinate.maximalCell,
      endY: coordinate.maximalRow,
      width: (minimalItem!.offsetWidth * (coordinate.maximalCell + 1 - coordinate.minimalCell)) + 'px',
      height: (minimalItem!.offsetHeight * (coordinate.maximalRow + 1 - coordinate.minimalRow)) + 'px',
      top: minimalItem!.offsetTop + 'px',
      left: minimalItem!.offsetLeft + 'px'
    }));
    this.shelveAreas$.set(this.shelveAreas$().concat(newAreas));
    this.goEditionMode(false);
  }

  public cellClick(cell: SurfaceCell): void {
    if (this.editionMode$()) {
      this.widthCell = this.cell.nativeElement.clientWidth;
      const scale = this.formGroup.get('scale')!.value;
      const data = this.data$();
      const surfCell: number = scale * scale / 10000;
      const newCoordinate = this.defineNewSurfaceCoordinate(cell);
      this.data$.set({
        ...data,
        rows: data.rows.map(r => ({
          ...r,
          cells: r.cells.map(c => {
            return {
              ...c,
              selected: c.rowIndex >= newCoordinate.minimalRow && c.rowIndex <= newCoordinate.maximalRow && c.index >= newCoordinate.minimalCell && c.index <= newCoordinate.maximalCell
            }
          })
        }))
      })
      // set formgroup
      const nbRowSelected = newCoordinate.maximalRow - newCoordinate.minimalRow + 1;
      const nbCellSelected = newCoordinate.maximalCell - newCoordinate.minimalCell + 1;
      this.shelveFormGroup.get(ShelveKey.WIDTH)!.patchValue(nbCellSelected * scale);
      this.shelveFormGroup.get(ShelveKey.HEIGHT)!.patchValue(nbRowSelected * scale);
      this.shelveFormGroup.get(ShelveKey.SURFACE)!.patchValue(nbRowSelected * nbCellSelected * surfCell);
    }
  }

  private resetForm(): void {
    this.surfaceCoordinate$.set({
      maximalRow: -1,
      minimalRow: -1,
      minimalCell: -1,
      maximalCell: -1
    });
    this.shelveFormGroup.reset();
    this.shelveFormGroup.get(ShelveKey.BACKGROUND_COLOR)!.patchValue('#f5f5f7');
    const data: Surface = this.data$();
    this.data$.set({
      ...data,
      rows: data.rows.map(r => ({
        ...r,
        cells: r.cells.map(c => {
          return {...c, selected: false}
        })
      }))
    })
  }

  private defineNewSurfaceCoordinate(cell: SurfaceCell): SurfaceCoordinate {
    const coordinate = this.surfaceCoordinate$();
    let newCoordinate!: SurfaceCoordinate;
    if (coordinate.minimalCell === -1) {
      newCoordinate = {
        maximalRow: cell.rowIndex,
        minimalRow: cell.rowIndex,
        minimalCell: cell.index,
        maximalCell: cell.index,
      };
    } else {
      newCoordinate = {
        maximalRow: cell.rowIndex >= coordinate.minimalRow ? cell.rowIndex : coordinate.maximalRow,
        minimalRow: cell.rowIndex < coordinate.minimalRow ? cell.rowIndex : coordinate.minimalRow,
        minimalCell: cell.index < coordinate.minimalCell ? cell.index : coordinate.minimalCell,
        maximalCell: cell.index >= coordinate.minimalCell ? cell.index : coordinate.maximalCell,
      };
    }

    this.surfaceCoordinate$.set(newCoordinate);
    return newCoordinate;
  }

  private initFormGroup(): void {
    this.formGroup = new FormGroup<any>({
      [StockKey.TITLE]: new FormControl(this.stock.title, [Validators.required]),
      [StockKey.WIDTH]: new FormControl(this.stock.width, [positiveNumberValidator()]),
      [StockKey.HEIGHT]: new FormControl(this.stock.height, [positiveNumberValidator()]),
      [StockKey.SCALE]: new FormControl(this.stock.scale, [positiveNumberValidator()])
    });
    this.formConfigs = [
      StockKey.TITLE,
      StockKey.WIDTH,
      StockKey.HEIGHT,
      StockKey.SCALE].map((key: string) => (
      {
        label: key,
        formControl: this.formGroup.get(key) as FormControl,
        input: key,
        inputType: InputType.TEXT,
        placeholder: `${this.translateKey}placeholder.${key}`,
        readonly: key !== StockKey.TITLE && !this.stock.isEmpty
      }
    ));

    if (!this.stock.isEmpty) {
      this.generateSurface();
    }

    // handle the error , with unsubscribe
    handleFormError(this.formGroup, this.errors$, this.destroyRef);

  }

  private initShelveCreateFormGroup(): void {
    this.shelveFormGroup = new FormGroup<any>({
      [ShelveKey.RACK]: new FormControl('', [Validators.required]),
      [ShelveKey.FLOOR]: new FormControl('', [Validators.required, positiveNumberValidator()]),
      [ShelveKey.WIDTH]: new FormControl('', [positiveNumberValidator()]),
      [ShelveKey.HEIGHT]: new FormControl('', [positiveNumberValidator()]),
      [ShelveKey.SURFACE]: new FormControl('', [positiveNumberValidator()]),
      [ShelveKey.BACKGROUND_COLOR]: new FormControl('#f5f5f7', [Validators.required])
    });
    this.shelveFormConfig = [
      ShelveKey.RACK,
      ShelveKey.FLOOR,
      ShelveKey.WIDTH,
      ShelveKey.HEIGHT,
      ShelveKey.SURFACE, ShelveKey.BACKGROUND_COLOR].map((key: string, index: number) => (
      {
        label: key,
        formControl: this.shelveFormGroup.get(key) as FormControl,
        input: key,
        inputType: key === ShelveKey.BACKGROUND_COLOR ? InputType.COLOR : InputType.TEXT,
        placeholder: `${this.translateKey}placeholder.${key}`,
        readonly: (index > 1)
      }
    ));
    // handle the error , with unsubscribe
    handleFormError(this.formGroup, this.shelveErrors$, this.destroyRef);
  }

  private invertHex(hex: string): string {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }
}
