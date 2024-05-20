import { Product, ProductType } from '@product/data';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Credential } from '@security/model';
import { Stock } from '@stock/data';

@Entity()
export class Consumption {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  consumption_id: string;
  @Column({ nullable: true })
  order_date: Date;
  @Column({  nullable: true })
  delivery_date: Date;
  @Column({ nullable: false })
  quantity: number;
  @Column()
  is_reserved: boolean;
  @Column()
  is_delivered: boolean;
  @Column({ nullable: false })
  type: ProductType;

  @ManyToOne(() => Product, (p: Product) => p.consumptions,
    { cascade: false, eager: false })
  @JoinColumn({name:'product_id_fk', referencedColumnName:'product_id'})
  product:Product;

  @ManyToOne(() => Credential, (c: Credential) => c.consumptions,
    { cascade: false, eager: true })
  @JoinColumn({name:'credential_id_fk', referencedColumnName:'credential_id'})
  author:Credential;

  @ManyToOne(() => Stock, (s: Stock) => s.consumptions,
    { cascade: false, eager: true })
  @JoinColumn({name:'stock_id_fk', referencedColumnName:'stock_id'})
  stock:Stock;
}