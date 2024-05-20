import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "@common/model";
import { ulid } from "ulid";
import { Cursus } from "./cursus.entity";

@Entity()
export class Lesson extends BaseEntity {

  @PrimaryColumn("varchar", { length: 26, default: () => `'${ulid()}'` })
  lesson_id: string;

  @Column({ length: 50, nullable: false })
  title: string;

  @Column({ length: 350, nullable: true })
  description: string;

  @Column({ length: 250, nullable: true })
  file: string;
  @Column({ length: 250, nullable: true })
  learning_achievement: string;

  @Column({ nullable: true })
  session_date: Date;

  @ManyToOne(() => Cursus, (ls: Cursus) => ls.lessons,
    { cascade: false, eager: false })
  cursus: Cursus;


}