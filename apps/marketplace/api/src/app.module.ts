import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './application/product.service';
import { PaymentService } from './application/payment.service';
import { WebhookProcessorService } from './application/webhook-processor.service';
import { InMemoryProductRepository } from './infrastructure/in-memory-product.repository';
import { StripeGateway } from './infrastructure/stripe.gateway';
import { InMemoryPaymentRepository } from './infrastructure/in-memory-payment.repository';
import { InMemoryWebhookEventRepository } from './infrastructure/in-memory-webhook-event.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    PaymentService,
    WebhookProcessorService,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: InMemoryProductRepository,
    },
    {
      provide: 'PAYMENT_GATEWAY',
      useClass: StripeGateway,
    },
    {
      provide: 'PAYMENT_REPOSITORY',
      useClass: InMemoryPaymentRepository,
    },
    {
      provide: 'WEBHOOK_EVENT_REPOSITORY',
      useClass: InMemoryWebhookEventRepository,
    },
  ],
})
export class AppModule {}
