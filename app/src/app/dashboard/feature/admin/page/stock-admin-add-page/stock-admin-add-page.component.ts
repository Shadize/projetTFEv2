import {Component, ElementRef, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StockCreatePayload} from '@shelve-feature';

interface Surface {
  rows: SurfaceRow[];
}

interface SurfaceRow {
  index: number;
  cells: SurfaceCell[]
}

interface SurfaceCell {
  index: number;
  str: string;
}

@Component({
  selector: 'app-stock-admin-add-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './stock-admin-add-page.component.html',
  styleUrl: './stock-admin-add-page.component.scss'
})
export class StockAdminAddPageComponent implements OnInit {
  public data$: WritableSignal<Surface> = signal({rows: []});
  formGroup: FormGroup<any> = new FormGroup<any>({
    width: new FormControl('1000'),
    height: new FormControl('500'),
    scale: new FormControl('50')
  })

  @ViewChild('table')

  table!: ElementRef;

  ngOnInit() {
    this.generateSurface();
  }

  public get widthControl(): FormControl {
    return this.formGroup.get('width') as FormControl;
  }

  public get heightControl(): FormControl {
    return this.formGroup.get('height') as FormControl;
  }

  public get scaleControl(): FormControl {
    return this.formGroup.get('scale') as FormControl;
  }

  public generateSurface(): void {
    this.data$.set({
      rows: [...Array(Math.ceil(this.heightControl.value / this.scaleControl.value)).keys()].map((row) => (
        {
          index: row,
          cells: [...Array(Math.ceil(this.widthControl.value / this.scaleControl.value)).keys()].map((cell) => (
            {
              index: cell,
              str: `${row}-${cell}`
            }
          ))
        }
      ))
    });
  }
public cellClick():void{
    console.log('je click');
}
  fakeData(): void {
    console.log('table', this.table.nativeElement.clientWidth);
    console.log('table', this.table.nativeElement.clientHeight);
  }
}
