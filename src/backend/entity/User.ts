import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Role } from "./Role";
import {AbstractEntity} from "@/backend/entity/AbstractEntity";

@Entity("users")
export class User extends AbstractEntity {

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;
}
