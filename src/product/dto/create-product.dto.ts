import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
@IsNotEmpty()
@Length(5)
@IsNumber()
id: number

@IsNotEmpty()
@IsString()
name: string

@IsNotEmpty()
@IsNumber()
price:number


@IsString()
description: string

}
