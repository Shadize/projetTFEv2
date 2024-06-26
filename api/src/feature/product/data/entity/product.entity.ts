import { ProductType } from '@product/data/enum';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Consumption } from '@consumption/data';
import { Shelve } from '@stock/data';

@Entity()
export class Product {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  product_id: string;
  @Column({ length: 50, nullable: false })
  title: string;
  @Column({ nullable: false, default: 0 })
  quantity: number;
  @Column({ length: 50, nullable: true })
  materials: string;
  @Column({ length: 50, nullable: true })
  treatment: string;
  @Column({ nullable: true })
  thickness: number;
  @Column({ nullable: true })
  width: number;
  @Column({ nullable: true })
  height: number;
  @Column({ nullable: true })
  price: number;

  @Column({ nullable: false })
  type: ProductType;
  @OneToMany(() => Consumption, (c: Consumption) => c.product,
    { onUpdate: 'CASCADE', eager: true })
  consumptions: Consumption[];
  @ManyToOne(() => Shelve, (s: Shelve) => s.products,
    { cascade: true, eager: false })
  @JoinColumn({ name: 'shelve_id_fk', referencedColumnName: 'shelve_id' })
  shelve: Shelve;
}