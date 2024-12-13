// A base class that contains shared properties like timestamps
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
