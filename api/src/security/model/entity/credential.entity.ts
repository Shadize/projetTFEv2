import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ulid } from 'ulid';
import { Consumption } from '../../../feature/consumption/data';


@Entity()
export class Credential {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'` })
  credential_id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: false, unique: true })
  mail: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  section: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn()
  created: Date;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn()
  updated: Date;

  @OneToMany(() => Consumption, (c: Consumption) => c.product,
    { cascade: false, eager: false })
  consumptions: Consumption[];
}