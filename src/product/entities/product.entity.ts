import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {

@PrimaryGeneratedColumn({name: 'product_id'})
id: number;

@Column()
name: string;

@Column()
price: number;

@Column()
description: string;

@CreateDateColumn()
createDate: Date;

}
