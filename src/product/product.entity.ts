import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "product"})
export class ProductEntity {

@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column()
price: number;

@Column({nullable: true, default: null})
description: string;

@CreateDateColumn()
createDate: string;

}
