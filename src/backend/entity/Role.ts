import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import {AbstractEntity} from "@/backend/entity/AbstractEntity";

@Entity("roles")
export class Role extends AbstractEntity {
  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
