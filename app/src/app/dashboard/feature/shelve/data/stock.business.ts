export interface Stock {
  stock_id: string;
  location: string;
  rack: string;
  floor: string;
  nb_items_max: number;
  section: Section;
  product: Product
}
