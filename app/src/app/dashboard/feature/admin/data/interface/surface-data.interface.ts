export interface Surface {
  nbRows:number;
  nbCells:number;
  rows: SurfaceRow[];
}

export interface SurfaceRow {
  index: number;
  cells: SurfaceCell[]
}

export interface SurfaceCell {
  rowIndex: number;
  index: number;
  str: string;
  selected:boolean;
}
export interface SurfaceCoordinate{
  minimalRow:number;
  maximalRow:number;
  minimalCell:number;
  maximalCell:number;
}
export interface ShelveArea{
  background:string;
  color:string;
  title:string;
  startX:number;
  startY:number;
  endX:number;
  endY:number;
  top:string;
  left:string;
  width:string;
  height:string;
}
