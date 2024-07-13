import { EntityManager, EntityRepository, Repository } from 'typeorm';

import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@EntityRepository()
export class ProductRepository extends Repository<ProductEntity> {
  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    console.log(createProductDto);
    const product = new ProductEntity();

    if (createProductDto.name) {
      product.name = createProductDto.name;
    }
    product.price = createProductDto.price;
    product.description = createProductDto.description;
    return this.save(product);
  }

  async updateProduct(
    product: ProductEntity,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }
    product.price = updateProductDto.price;
    product.description = updateProductDto.description;
    
    return await this.save(product) ;
  }

  async deleteProduct(product: ProductEntity): Promise<void> {
    await this.remove(product);
  }
}

