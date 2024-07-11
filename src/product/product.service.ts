import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, id: number) {

    const isExist = await this.productRepository.findBy({
      id: id,
    });

    if(!isExist){
      throw new BadRequestException('this product have already been')
    }

    const newProduct = {
      id: createProductDto.id,
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description,
    } 
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return 'hello this page can return you all products';
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
