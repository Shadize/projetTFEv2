import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Section } from '@common/data';
import { Shelve } from '@stock/data';

@Entity()
export class Stock {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  stock_id: string;
  @Column({ nullable: false })
  section: Section;
  @OneToMany(() => Shelve, (s: Shelve) => s.location,
    { cascade: false, eager: true })
  @JoinColumn({ name: 'stock_id_fk', referencedColumnName: 'stock_id' })
  shelves: Shelve[];
}