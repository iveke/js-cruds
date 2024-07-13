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
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto, product: ProductEntity) {
    // const productRepository = new ProductEntity();

    // const productRepository = new ProductRepository();
    // productRepository.createProduct(createProductDto)

    const productRepository = new ProductRepository<ProductEntity>;
    productRepository.createProduct(createProductDto);
    
    return productRepository;
  }

  async findAll(product: ProductEntity) {
    const products = await this.productRepository.find();

    if (products.length < 0) {
      throw new NotFoundException('products not found');
    }

    return products;
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
