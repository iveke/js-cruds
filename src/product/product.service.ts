import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto, product: ProductEntity) {
    // const productReposito = new ();
console.log(this.productRepository)

  await this.productRepository.createProduct(createProductDto);

    // const productRepository = new ProductRepository<ProductEntity>;
    // productRepository.createProduct(createProductDto);
    
    return product;
  }

  async findAll(productList: ProductEntity) {

    return productList;
  }

  async findOne(product: ProductEntity) {

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
