export interface Surface {
  nbRows: number;
  nbCells: number;
  rows: SurfaceRow[];
  wallLeftItems: SurfaceDoorCell[];
  wallRightItems: SurfaceDoorCell[];
  wallTopItems: SurfaceDoorCell[];
  wallBottomItems: SurfaceDoorCell[];
}

export interface SurfaceDefinition {
  width: number;
  height: number;
  scale: number;
}

export interface SurfaceDoorCell {
  index: number;
  str: string;
  wall: string;
  selected: boolean;
}

export interface SurfaceRow {
  index: number;
  cells: SurfaceCell[]
}

export interface SurfaceCell {
  rowIndex: number;
  index: number;
  str: string;
  selected: boolean;
}

export interface SurfaceCoordinate {
  minimalRow: number;
  maximalRow: number;
  minimalCell: number;
  maximalCell: number;
}
