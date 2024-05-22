export interface Surface {
  nbRows:number;
  nbCells:number;
  rows: SurfaceRow[];
}
export interface SurfaceDefinition{
  width:number;
  height:number;
  scale:number;
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
