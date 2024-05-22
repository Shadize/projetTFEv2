import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ShelveArea, Surface, SurfaceCell, SurfaceCoordinate, SurfaceFormKey} from '../../data';
import {
  CardHeaderComponent, CellDefinition,
  DataTableComponent, DataTableConfig,
  FormControlSimpleConfig,
  FormError,
  handleFormError,
  InputType,
  LabelWithParamPipe,
  positiveNumberValidator
} from '@shared';
import {Stock} from '@shelve-feature';
import {ShelveUtilsService} from '../../../shelve/service';
import {ShelveKey} from '../../../shelve/data/enum';
import {Element} from '@angular/compiler';

@Component({
  selector: 'app-shelve-admin-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LabelWithParamPipe,
    TranslateModule,
    DataTableComponent,
    CardHeaderComponent,
  ],
  templateUrl: './shelve-admin-form.component.html',
  styleUrl: './shelve-admin-form.component.scss'
})
export class ShelveAdminFormComponent implements OnInit {
  @Input({required: true}) stock!: Stock;
  @ViewChild('table')
  public table!: ElementRef;
  @ViewChild('cell')
  public cell!: ElementRef;
  public widthCell: number = 0;
  public shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  public shelveDataTableConfig: DataTableConfig = this.shelveUtils.getAdminDataTableConfig(this.stock?.shelves);
  public shelveFormGroup!: FormGroup;
  public shelveFormConfig: FormControlSimpleConfig[] = [];
  public data$: WritableSignal<Surface> = signal({nbRows: 0, nbCells: 0, rows: []});
  public errors$: WritableSignal<FormError[]> = signal([]);
  public shelveErrors$: WritableSignal<FormError[]> = signal([]);
  public editionMode$: WritableSignal<boolean> = signal(true);
  public shelveAreas$: WritableSignal<ShelveArea[]> = signal([]);
  public surfaceCoordinate$: WritableSignal<SurfaceCoordinate> = signal({
    maximalRow: -1,
    minimalRow: -1,
    minimalCell: -1,
    maximalCell: -1
  });
  public formGroup!: FormGroup;
  public formConfigs: FormControlSimpleConfig[] = [];
  public destroyRef: DestroyRef = inject(DestroyRef);
  public translateKey: string = 'admin-feature-shelve.table.label.';

  ngOnInit() {
    this.initFormGroup();
    this.initShelveCreateFormGroup();
    this.generateSurface();
  }

  public generateSurface(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.data$.set({
      nbRows: Math.ceil(this.formConfigs[1].formControl.value / this.formConfigs[2].formControl.value),
      nbCells: Math.ceil(this.formConfigs[0].formControl.value / this.formConfigs[2].formControl.value),
      rows: [...Array(Math.ceil(this.formConfigs[1].formControl.value / this.formConfigs[2].formControl.value)).keys()].map((row) => (
        {
          index: row,
          cells: [...Array(Math.ceil(this.formConfigs[0].formControl.value / this.formConfigs[2].formControl.value)).keys()].map((cell) => (
            {
              rowIndex: row,
              index: cell,
              str: `${row}-${cell}`,
              selected: false
            }
          ))
        }))
    });

  }

  public onResize(): void {
    this.widthCell = this.cell.nativeElement.offsetWidth;
    const data: Surface = this.data$();
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

  public goEditionMode(go: boolean): void {
    this.editionMode$.set(go);
  }

  public validate(): void {
    const coordinate = this.surfaceCoordinate$();
    const minimalItem = document.getElementById(coordinate.minimalRow + '-' + coordinate.minimalCell);

    let newArea: ShelveArea = {
      background: this.shelveFormGroup.get(ShelveKey.BACKGROUND_COLOR)!.value,
      color: this.invertHex(this.shelveFormGroup.get(ShelveKey.BACKGROUND_COLOR)!.value.replace('#', '')),
      title: this.shelveFormGroup.get(ShelveKey.RACK)!.value,
      startX: coordinate.minimalCell,
      startY: coordinate.minimalRow,
      endX: coordinate.maximalCell,
      endY: coordinate.maximalRow,
      width:(minimalItem!.offsetWidth * (coordinate.maximalCell + 1 - coordinate.minimalCell)) + 'px',
      height:(minimalItem!.offsetHeight * (coordinate.maximalRow + 1 - coordinate.minimalRow)) + 'px',
      top: minimalItem!.offsetTop + 'px',
      left: minimalItem!.offsetLeft + 'px',
    }
    console.log(document.getElementById(coordinate.minimalRow + '-' + coordinate.minimalCell)!.offsetTop);
    this.shelveAreas$.set([newArea].concat(this.shelveAreas$()))
    this.surfaceCoordinate$.set({
      maximalRow: -1,
      minimalRow: -1,
      minimalCell: -1,
      maximalCell: -1
    });
    this.shelveFormGroup.reset();
    this.shelveFormGroup.get(ShelveKey.BACKGROUND_COLOR)!.patchValue('#f5f5f7');
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
      [SurfaceFormKey.WIDTH]: new FormControl('1000', [positiveNumberValidator()]),
      [SurfaceFormKey.HEIGHT]: new FormControl('500', [positiveNumberValidator()]),
      [SurfaceFormKey.SCALE]: new FormControl('50', [positiveNumberValidator()])
    });
    this.formConfigs = [
      SurfaceFormKey.WIDTH,
      SurfaceFormKey.HEIGHT,
      SurfaceFormKey.SCALE].map((key: string) => (
      {
        label: key,
        formControl: this.formGroup.get(key) as FormControl,
        input: key,
        inputType: InputType.TEXT
      }
    ));
    // handle the error , with unsubscribe
    handleFormError(this.formGroup, this.errors$, this.destroyRef);
  }

  private initShelveCreateFormGroup(): void {
    this.shelveFormGroup = new FormGroup<any>({
      [ShelveKey.RACK]: new FormControl('', [Validators.required]),
      [ShelveKey.FLOOR]: new FormControl('', [positiveNumberValidator()]),
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

  invertHex(hex: string): string {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }
}
