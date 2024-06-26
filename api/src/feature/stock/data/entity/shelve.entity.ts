import { Product, ProductType } from '@product/data';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Section } from '@common/data';
import { Consumption } from '@consumption/data';
import { Stock } from '@stock/data';

@Entity()
export class Shelve {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  shelve_id: string;

  @ManyToOne(() => Stock, (s: Stock) => s.shelves,
    { cascade: false, eager: false })
  @JoinColumn({ name: 'stock_id_fk', referencedColumnName: 'stock_id' })
  location: Stock;
  @Column({ length: 10, nullable: false })
  rack: string;
  @Column({ length: 10, nullable: true })
  floor: string;
  @Column({ nullable: false, default: 0 })
  nb_items_max: number;
  @OneToMany(() => Consumption, (c: Consumption) => c.product,
    { cascade: false, eager: false })
  consumptions: Consumption[];
  @OneToMany(() => Product, (p: Product) => p.shelve,
    { nullable: true, cascade: false, eager: true })
  products: Product[];
  @Column({ nullable: false, default:'' })
  location_reference: string;
  @Column({ nullable: false })
  background: string;
  @Column({ nullable: false })
  color: string;
  @Column({ nullable: false })
  startX: number;
  @Column({ nullable: false })
  startY: number;
  @Column({ nullable: false })
  endX: number;
  @Column({ nullable: false })
  endY: number;
  @Column({ nullable: false })
  top: string;
  @Column({ nullable: false })
  left: string;
  @Column({ nullable: false })
  width: string;
  @Column({ nullable: false })
  height: string;
}