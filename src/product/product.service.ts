import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const isExist = await this.productRepository.findBy({
      id: createProductDto.id,
    });

    if (!isExist) {
      throw new BadRequestException('this product have already been');
    }

    const newProduct = {
      id: createProductDto.id,
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description,
    };
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    const products = await this.productRepository.find();

    if (products.length < 0) {
      throw new NotFoundException('products not found');
    }

    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    await this.productRepository.update(id, updateProductDto);

    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('product not found');
    }
    return await this.productRepository.delete(id);
  }
}
