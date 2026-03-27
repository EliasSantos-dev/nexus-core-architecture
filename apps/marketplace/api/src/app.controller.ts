import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './application/product.service';
import { Product } from './domain/product.entity';

@Controller('products')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.listProducts();
  }

  @Post()
  async createProduct(@Body() productData: Omit<Product, 'id'>): Promise<Product> {
    return this.productService.createProduct(productData);
  }
}
