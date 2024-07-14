import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    console.log(this.productRepository);
    // const productReposito = new ();
    // console.log('its product.service 21code', this.productRepository);
    console.log(createProductDto);
    console.log(this);
    const product =await (this.productRepository as ProductRepository).createProduct(createProductDto);
    // const lolipop =
    //   await this.productRepository.createProduct(createProductDto);
    // const productRepository = newProductRepository<ProductEntity>;
    // productRepository.createProduct(createProductDto);

    return;
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

    this.productRepository.update(id, updateProductDto);

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
