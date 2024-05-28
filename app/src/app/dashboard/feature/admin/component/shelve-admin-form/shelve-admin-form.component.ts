import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  Signal,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {Surface, SurfaceCell, SurfaceCoordinate, SurfaceDoorCell} from '../../data';
import {
  AppRoutes,
  CardHeaderComponent,
  ConfirmDialogComponent,
  DataTableComponent,
  DataTableConfig,
  FormControlSimpleConfig,
  FormError,
  handleFormError,
  InputType,
  LabelWithParamPipe,
  positiveNumberValidator
} from '@shared';
import {
  Shelve,
  ShelveKey,
  ShelveUtilsService,
  Stock,
  StockDoor,
  StockDoorPosition,
  StockDoorType,
  StockKey,
  StockService,
  StockUtilsService
} from '@shelve-feature';
import {Section} from '@core';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {ulid} from 'ulid';

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
  @ViewChild('wallV')
  public wallV!: ElementRef;
  @ViewChild('wallH')
  public wallH!: ElementRef;
  public router: Router = inject(Router);
  public widthCell: number = 0;
  public shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  public stockUtils: StockUtilsService = inject(StockUtilsService);
  public stockService: StockService = inject(StockService);
  public shelveFormGroup!: FormGroup;
  public shelveFormConfig: FormControlSimpleConfig[] = [];
  public data$: WritableSignal<Surface> = signal({
    wallTopItems: [], wallLeftItems: [], wallRightItems: [],
    wallBottomItems: [],
    nbRows: 0,
    nbCells: 0,
    rows: []
  });
  public errors$: WritableSignal<FormError[]> = signal([]);
  public shelveErrors$: WritableSignal<FormError[]> = signal([]);
  public editionMode$: WritableSignal<boolean> = signal(false);
  public wallEditionMode$: WritableSignal<boolean> = signal(false);
  public shelveAreas$: WritableSignal<Shelve[]> = signal(this.stock?.shelves ?? []);
  public doors$: WritableSignal<StockDoor[]> = signal(this.stock?.doors ?? []);
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
  public readonly StockDoorType = StockDoorType;
  public readonly StockDoorPosition = StockDoorPosition;

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
        shelves: this.shelveAreas$(),
        doors: this.doors$()
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

  public addDoor(): void {
    if (this.editionMode$()) {
      return
    }
    if (this.wallEditionMode$()) {
      this.validateDoors();
      this.generateSurface();
    }
    this.wallEditionMode$.set(!this.wallEditionMode$());
  }

  public validateDoors(): void {
    const selection: SurfaceDoorCell[] = this.data$().wallLeftItems.concat(this.data$().wallRightItems).concat(this.data$().wallTopItems).concat(this.data$().wallBottomItems)
      .filter(p => p.selected);
    if (selection.length > 0) {
      const item = selection[0];
      const cellIndex = selection.map(s => s.index);
      const minimalCell = Math.min(...cellIndex);
      const maxCell = Math.max(...cellIndex);
      const nbCell = maxCell - minimalCell + 1;
      const wallV = this.wallV.nativeElement.offsetHeight;
      const wallH = this.wallH.nativeElement.offsetWidth;
      const width = item.type === StockDoorType.HORIZONTAL ? `${(nbCell * wallH) + (nbCell - 1)}px` : '32px';
      const height = item.type === StockDoorType.VERTICAL ? `${(nbCell * wallV) + (nbCell - 1)}px` : '32px';
      const top = item.type === StockDoorType.HORIZONTAL ? '-1px' : `${(minimalCell * wallV) + (nbCell / 2 + 29)}px`;
      const left = item.type === StockDoorType.VERTICAL ? '-1px' : `${minimalCell * wallH + (nbCell / 2 + 29)}px`;
      let style = item.wall === StockDoorPosition.TOP || item.type === StockDoorType.VERTICAL ? `top:${top};` : `bottom:${top};`;
      style += item.wall === StockDoorPosition.LEFT || item.type === StockDoorType.HORIZONTAL ? `left:${left};` : `right:${left};`;
      style += `width:${width};height:${height}`;
      const stockDoors: StockDoor = {
        id: '', str: '', isEmpty: false,
        wall: item.wall,
        type: item.type,
        startX: minimalCell,
        endX: maxCell,
        startY: minimalCell,
        endY: maxCell ? 1 : 0,
        style
      };
      this.doors$.set(this.doors$().concat(stockDoors));

    }

  }

  public generateSurface(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.data$.set({
      wallTopItems: this.genWallCell([...Array(Math.ceil(this.formConfigs[1].formControl.value / this.formConfigs[3].formControl.value)).keys()], StockDoorPosition.TOP, StockDoorType.HORIZONTAL),
      wallBottomItems: this.genWallCell([...Array(Math.ceil(this.formConfigs[1].formControl.value / this.formConfigs[3].formControl.value)).keys()], StockDoorPosition.BOTTOM, StockDoorType.HORIZONTAL),
      wallLeftItems: this.genWallCell([...Array(Math.ceil(this.formConfigs[2].formControl.value / this.formConfigs[3].formControl.value)).keys()], StockDoorPosition.LEFT, StockDoorType.VERTICAL),
      wallRightItems: this.genWallCell([...Array(Math.ceil(this.formConfigs[2].formControl.value / this.formConfigs[3].formControl.value)).keys()], StockDoorPosition.RIGHT, StockDoorType.VERTICAL),
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
      this.doors$.set(this.stock.doors.map(item => this.doorsFactor(item)));
      console.log(this.stock.doors);
    }

  }

  public doorsFactor(item: StockDoor): StockDoor {

    if (this.wallH?.nativeElement && this.wallV?.nativeElement) {
      const nbCell = item.endX - item.startX + 1;
      const wallV = this.wallV.nativeElement.offsetHeight;
      const wallH = this.wallH.nativeElement.offsetWidth;
      const width = item.type === StockDoorType.HORIZONTAL ? `${(nbCell * wallH) + (nbCell - 1)}px` : '32px';
      const height = item.type === StockDoorType.VERTICAL ? `${(nbCell * wallV) + (nbCell - 1)}px` : '32px';
      const top = item.type === StockDoorType.HORIZONTAL ? '-1px' : `${(item.startX * wallV) + (nbCell / 2 + 29)}px`;
      const left = item.type === StockDoorType.VERTICAL ? '-1px' : `${item.startX * wallH + (nbCell / 2 + 29)}px`;
      let style = item.wall === StockDoorPosition.TOP || item.type === StockDoorType.VERTICAL ? `top:${top};` : `bottom:${top};`;
      style += item.wall === StockDoorPosition.LEFT || item.type === StockDoorType.HORIZONTAL ? `left:${left};` : `right:${left};`;
      style += `width:${width};height:${height}`;
      return {
        ...item,
        style
      };
    }
    return item;
  }

  public onResize(): void {
    if (this.cell?.nativeElement) {
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
    if (this.wallH?.nativeElement && this.wallV?.nativeElement) {
      this.doors$.set(
        this.doors$().map((item: StockDoor) => {

          const nbCell = item.endX - item.startX + 1;
          const wallV = this.wallV.nativeElement.offsetHeight;
          const wallH = this.wallH.nativeElement.offsetWidth;
          const width = item.type === StockDoorType.HORIZONTAL ? `${(nbCell * wallH) + (nbCell - 1)}px` : '32px';
          const height = item.type === StockDoorType.VERTICAL ? `${(nbCell * wallV) + (nbCell - 1)}px` : '32px';
          const top = item.type === StockDoorType.HORIZONTAL ? '-1px' : `${(item.startX * wallV) + (nbCell / 2 + 29)}px`;
          const left = item.type === StockDoorType.VERTICAL ? '-1px' : `${item.startX * wallH + (nbCell / 2 + 29)}px`;
          let style = item.wall === StockDoorPosition.TOP || item.type === StockDoorType.VERTICAL ? `top:${top};` : `bottom:${top};`;
          style += item.wall === StockDoorPosition.LEFT || item.type === StockDoorType.HORIZONTAL ? `left:${left};` : `right:${left};`;
          style += `width:${width};height:${height}`;
          return {
            ...item,
            style
          };
        })
      )
    }
  }


  public setWallSelection(row: SurfaceDoorCell) {
    if (this.wallEditionMode$()) {
      switch (row.wall) {
        case StockDoorPosition.TOP:
          this.data$.set({
            ...this.data$(),
            wallTopItems: this.data$().wallTopItems.map((i, index) => (index === row.index ? {
              ...i,
              selected: !i.selected
            } : {...i}))
          });
          break
        case StockDoorPosition.LEFT:
          this.data$.set({
            ...this.data$(),
            wallLeftItems: this.data$().wallLeftItems.map((i, index) => (index === row.index ? {
              ...i,
              selected: !i.selected
            } : {...i}))
          });
          break
        case StockDoorPosition.RIGHT:
          this.data$.set({
            ...this.data$(),
            wallRightItems: this.data$().wallRightItems.map((i, index) => (index === row.index ? {
              ...i,
              selected: !i.selected
            } : {...i}))
          });
          break
        case StockDoorPosition.BOTTOM:
          this.data$.set({
            ...this.data$(),
            wallBottomItems: this.data$().wallBottomItems.map((i, index) => (index === row.index ? {
              ...i,
              selected: !i.selected
            } : {...i}))
          });
          break
      }
    }
  }

  public goEditionMode(go: boolean): void {
    if (this.wallEditionMode$()) {
      return;
    }
    this.editionMode$.set(go);
    if (!go) {
      this.resetForm();
    }
  }

  public validate(): void {
    const coordinate = this.surfaceCoordinate$();
    const minimalItem = document.getElementById(coordinate.minimalRow + '-' + coordinate.minimalCell);
    const locationReference: string = ulid();
    let newAreas: Shelve[] = Array(parseInt(this.shelveFormGroup.get(ShelveKey.FLOOR)!.value, 10)).fill(0).map((key, index) => ({
      floor: (index + 1).toString(),
      locationReference,
      nbItemsMax: 0,
      id: '',
      isEmpty: false,
      location: '', products: [],
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
      left: minimalItem!.offsetLeft + 'px',
      productName: '',
      productQuantity: ''
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

  private genWallCell(data: number[], wall: StockDoorPosition, type: StockDoorType): SurfaceDoorCell[] {
    return data.map((d, index) => ((
      {
        index,
        type,
        str: d.toString(),
        selected: false,
        wall
      }
    )));
  }
}
