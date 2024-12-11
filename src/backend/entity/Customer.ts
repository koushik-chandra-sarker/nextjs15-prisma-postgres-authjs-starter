import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import {AbstractEntity} from "@/backend/entity/AbstractEntity";

@Entity("customers")
export class Customer extends AbstractEntity {

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user!: User;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ default: true })
  isActive!: boolean;
  @Column({ default: true })
  isdd!: boolean;
}
