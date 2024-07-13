import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class productItemDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsString()
    description: string

}