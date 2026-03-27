import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { IPaymentGateway } from '../domain/payment.entity';

@Injectable()
export class StripeGateway implements IPaymentGateway {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('STRIPE_SECRET_KEY') || 'sk_test_mock';
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-02-24-preview',
    });
  }

  async createPaymentIntent(amount: number, currency: string, metadata: Record<string, any>): Promise<{ id: string; clientSecret: string }> {
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency,
      metadata,
    });

    if (!intent.client_secret) {
      throw new Error('Falha ao gerar o client secret do Stripe');
    }

    return {
      id: intent.id,
      clientSecret: intent.client_secret,
    };
  }

  async handleWebhook(payload: any, signature: string): Promise<void> {
    // Implementação resiliente com tratamento de webhooks virá no próximo passo
    console.log('Webhook recebido do Stripe:', payload.type);
  }
}
