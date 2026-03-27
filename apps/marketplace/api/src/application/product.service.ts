import { Injectable, Inject } from '@nestjs/common';
import { Product, IProductRepository } from '../domain/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: IProductRepository,
  ) {}

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    const product: Product = {
      ...productData,
      id: crypto.randomUUID(),
    };
    return this.productRepository.create(product);
  }

  async listProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
