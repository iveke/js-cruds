import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PRODUCT_ERROR } from '../enum/product-error.enum';
import { ProductEntity } from '../product.entity';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params) {
      throw new BadRequestException(PRODUCT_ERROR.GUARD);
    }
    if(params.productId){
      
    const product = await this.productRepository.findOne({
      where: { id: params.productId },
    });

    if (!product) {
      throw new BadRequestException(PRODUCT_ERROR.NOT_FOUND);
    }

    request.product = product;
    return true;
    } else {
      const productList = await this.productRepository.find();

      if (!productList) {
        throw new BadRequestException(PRODUCT_ERROR.NOT_FOUND);
      }
  
      request.productList = productList;
      return true;
    }

  }
}
