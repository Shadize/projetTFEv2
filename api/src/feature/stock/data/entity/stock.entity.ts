import { Product, ProductType } from '@product/data';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Section } from '@common/data';
import { Consumption } from '@consumption/data';

@Entity()
export class Stock {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  stock_id: string;
  @Column({ length: 50, nullable: false })
  location: string;
  @Column({ length: 10, nullable: false })
  rack: string;
  @Column({ length: 10, nullable: true })
  floor: string;
  @Column({ nullable: true })
  nb_items_max: number;
  @Column({ nullable: false })
  section: Section;
  @OneToMany(() => Consumption, (c: Consumption) => c.product,
    { cascade: false, eager: false })
  consumptions: Consumption[];
  @OneToOne(() => Product, (p: Product) => p.stock,
    { cascade: false, eager: true })
  product: Product
}