import { Controller, Get, Post, Body, Headers, BadRequestException, RawBodyRequest, Req } from '@nestjs/common';
import { ProductService } from './application/product.service';
import { PaymentService } from './application/payment.service';
import { WebhookProcessorService } from './application/webhook-processor.service';
import { Product } from './domain/product.entity';

@Controller()
export class AppController {
  constructor(
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
    private readonly webhookProcessor: WebhookProcessorService,
  ) {}

  @Get('products')
  async getProducts(): Promise<Product[]> {
    return this.productService.listProducts();
  }

  @Post('products')
  async createProduct(@Body() productData: Omit<Product, 'id'>): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Post('checkout')
  async checkout(@Body() data: { orderId: string; customerId: string; amount: number }): Promise<{ paymentId: string; clientSecret: string }> {
    return this.paymentService.checkout(data.orderId, data.customerId, data.amount);
  }

  @Post('webhooks/stripe')
  async handleStripeWebhook(@Body() event: any): Promise<void> {
    // Em produção, usaríamos o Stripe SDK para validar a assinatura bruta (@Req() req: RawBodyRequest<Request>)
    // Para o portfólio, demonstramos a lógica de processamento idempotente.
    return this.webhookProcessor.processEvent(event);
  }
}
