import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Section } from '@common/data';
import { Shelve } from '@stock/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';

@Entity()
export class Stock {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  stock_id: string;
  @Column({ nullable: false , default:'Unknown'})
  title:string;
  @Column({ nullable: false , default:0})
  width:number;
  @Column({ nullable: false , default:0})
  height:number;
  @Column({ nullable: false , default:0})
  scale:number;
  @Column({ nullable: false })
  section: Section;
  @OneToMany(() => Shelve, (s: Shelve) => s.location,
    { cascade: true, eager: true })
  @JoinColumn({ name: 'stock_id_fk', referencedColumnName: 'stock_id' })
  shelves: Shelve[];
}