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
    console.log(params)

    if (!params) {
      throw new BadRequestException(PRODUCT_ERROR.GUARD);
    }

    const product = await this.productRepository.findOne({
      where: { id: params.productID },
    });

    if (!product) {
      throw new BadRequestException(PRODUCT_ERROR.NOT_FOUND);
    }

    request.product = product;
    return true;
  }
}
