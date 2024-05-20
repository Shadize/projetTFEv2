import { BaseEntity } from "@common/model";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";
import { Lesson } from "./lesson.entity";

@Entity()
export class Cursus extends BaseEntity {

  @PrimaryColumn("varchar", { length: 26, default: () => `'${ulid()}'` })
  cursus_id: string;

  @Column({ length: 50, nullable: false })
  title: string;

  @Column({ length: 350, nullable: true })
  description: string;

  @Column({ length: 30, nullable: true })
  code: string;

  @Column({ length: 150, nullable: true })
  contract: string;

  @OneToMany(() => Lesson, (ls: Lesson) => ls.cursus,
    { cascade: true, eager: true })
  lessons: Lesson[];


}