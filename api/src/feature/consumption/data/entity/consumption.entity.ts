import { Product, ProductType } from '@product/data';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Credential } from '@security/model';
import { ConsumptionStatus } from '@consumption/data';

@Entity()
export class Consumption {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  consumption_id: string;
  @Column({ nullable: true })
  order_date: Date;
  @Column({ nullable: true })
  delivery_date: Date;
  @Column({ nullable: false })
  quantity: number;
  @Column()
  is_reserved: boolean;
  @Column()
  is_delivered: boolean;
  @Column({ nullable: false, default: 'ACTIVE' })
  status: ConsumptionStatus;
  @ManyToOne(() => Product, (p: Product) => p.consumptions,
    { cascade: true, eager: false })
  @JoinColumn({ name: 'product_id_fk', referencedColumnName: 'product_id' })
  product: Product;


  //1-1 donc dans le payload c'est obligatoire @IsNotEmpty()
  @ManyToOne(() => Credential, (c: Credential) => c.consumptions,
    { cascade: false, eager: true })
  @JoinColumn({ name: 'credential_id_fk', referencedColumnName: 'credential_id' })
  author: Credential;
  // on stock l'emplacement sous forme de chaine de caractère

  @Column({ nullable: false })
  productName:string;

  @Column({ nullable: false })
  shelve:string;
  // on stock l'id comme ca on peut y retourner.
  @Column({ nullable: false })
  shelve_reference:string;
}