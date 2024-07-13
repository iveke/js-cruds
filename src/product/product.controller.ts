import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductGuard } from './guard/product.guard';
import { GetProduct, GetProductList } from './get-product.decorator';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(ProductGuard)
  create(
    @Body() createProductDto: CreateProductDto,
    @GetProduct() product: ProductEntity,
  ) {
    console.log(product);
    return this.productService.create(createProductDto, product);
  }

  @Get('list')
  @UseGuards(ProductGuard)
  findAll(@GetProductList() productList: ProductEntity) {
    return this.productService.findAll(productList);
  }

  @Get('list/:productId')
  @UseGuards(ProductGuard)
  findOne(@Param('productId') id:string, @GetProduct() product: ProductEntity) {
    return this.productService.findOne(product);
  }

  @Patch(':id')
  update(@Query('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
