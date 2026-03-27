import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './application/product.service';
import { InMemoryProductRepository } from './infrastructure/in-memory-product.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: InMemoryProductRepository,
    },
  ],
})
export class AppModule {}
