import { Product, IProductRepository } from '../domain/product.entity';

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }
}
