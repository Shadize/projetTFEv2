import {AfterViewInit, Component, ElementRef, Input, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {Shelve, Stock, StockDoor, StockDoorPosition, StockDoorType} from '../../data';
import {Surface, SurfaceDoorCell} from '@admin-feature';

@Component({
  selector: 'app-stock-plan',
  standalone: true,
  imports: [],
  templateUrl: './stock-plan.component.html',
  styleUrl: './stock-plan.component.scss'
})
export class StockPlanComponent implements OnInit, AfterViewInit {
  @Input() detail!: Stock;
  protected readonly StockDoorType = StockDoorType;
  @ViewChild('table')
  public table!: ElementRef;
  @ViewChild('wallV')
  public wallV!: ElementRef;
  @ViewChild('wallH')
  public wallH!: ElementRef;
  public shelveAreas$: WritableSignal<Shelve[]> = signal([]);
  public doors$: WritableSignal<StockDoor[]> = signal([]);
  public data$: WritableSignal<Surface> = signal({
    wallTopItems: [], wallLeftItems: [], wallRightItems: [],
    wallBottomItems: [],
    nbRows: 0,
    nbCells: 0,
    rows: []
  });

  ngOnInit() {
    console.log(this.detail);
    this.generateSurface();
  }

  ngAfterViewInit() {
    this.onResize();
  }

  public generateSurface(): void {
    const nbRows = Math.ceil(this.detail.height / this.detail.scale);
    const nbCells = Math.ceil(this.detail.width / this.detail.scale);
    this.data$.set({
      wallTopItems: this.genWallCell([...Array(nbCells).keys()], StockDoorPosition.TOP, StockDoorType.HORIZONTAL),
      wallBottomItems: [],
      wallLeftItems: this.genWallCell([...Array(nbRows).keys()], StockDoorPosition.LEFT, StockDoorType.VERTICAL),
      wallRightItems: [],
      nbRows,
      nbCells,
      rows: [...Array(nbRows).keys()].map((row) => (
        {
          index: row,
          cells: [...Array(nbCells).keys()].map((cell) => (
            {
              rowIndex: row,
              index: cell,
              str: `${row}-${cell}`,
              selected: false
            }
          ))
        }))
    });
    if (!this.detail.isEmpty) {
      this.shelveAreas$.set(this.detail.shelves);
      this.doors$.set(this.detail.doors.map(item => this.doorsFactor(item)));
    }
  }

  public onResize(): void {
    this.shelveAreas$.set(
      this.shelveAreas$().map((item: Shelve) => {
        const minimalItem = document.getElementById(item.startY + '-' + item.startX);
        if (!minimalItem) {
          return {...item}
        }
        return {
          ...item,
          width: (minimalItem!.offsetWidth * (item.endX + 1 - item.startX)) + 'px',
          height: (minimalItem!.offsetWidth * (item.endY + 1 - item.startY)) + 'px',
          top: minimalItem!.offsetTop + 'px',
          left: minimalItem!.offsetLeft + 'px'
        }
      })
    )
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
      console.log('nbCell', nbCell);
      console.log('height', height);
      return {
        ...item,
        style
      };
    }
    return item;
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

