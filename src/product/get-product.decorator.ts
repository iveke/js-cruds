import { createParamDecorator } from '@nestjs/common';
import { ProductEntity } from './product.entity';

export const GetProduct = createParamDecorator((data: string, context) => {
  const product: ProductEntity = context.switchToHttp().getRequest().product;
  // console.log(product, data, context);
  // return data ? product && product[data] : product;
  return product;
});

export const GetProductList = createParamDecorator((data: string, context) => {
  const productList : ProductEntity = context.switchToHttp().getRequest().productList;

  return productList
})
