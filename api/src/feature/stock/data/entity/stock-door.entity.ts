import { StockDoorPosition, StockDoorType } from '@stock/data/enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Stock } from '@stock/data';

@Entity()
export class StockDoor {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  stock_door_id: string;
  @Column({ nullable: false , default:StockDoorPosition.TOP.toString()})
  wall: StockDoorPosition;
  @Column({ nullable: false , default:0})
  startX: number;
  @Column({ nullable: false , default:0})
  startY: number;
  @Column({ nullable: false , default:0})
  endX: number;
  @Column({ nullable: false , default:0})
  endY: number;
  @Column({ nullable: false , default:StockDoorType.HORIZONTAL.toString()})
  style: string;
  @Column({ default: StockDoorType.HORIZONTAL})
  type: StockDoorType;
  @ManyToOne(() => Stock, (s: Stock) => s.shelves,
    { cascade: false, eager: false })
  @JoinColumn({ name: 'stock_id_fk', referencedColumnName: 'stock_id' })
  location: Stock;
}