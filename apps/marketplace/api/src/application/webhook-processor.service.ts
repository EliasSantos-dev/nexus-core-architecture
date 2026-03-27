import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IPaymentRepository } from '../domain/payment.entity';
import { IWebhookEventRepository } from '../domain/webhook-event.entity';

@Injectable()
export class WebhookProcessorService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private readonly paymentRepository: IPaymentRepository,
    @Inject('WEBHOOK_EVENT_REPOSITORY')
    private readonly webhookEventRepository: IWebhookEventRepository,
  ) {}

  async processEvent(event: { id: string; type: string; data: any }): Promise<void> {
    // 1. Verificar Idempotência
    const existingEvent = await this.webhookEventRepository.findById(event.id);
    if (existingEvent && existingEvent.status === 'PROCESSED') {
      console.log(`Evento ${event.id} já processado. Pulando...`);
      return;
    }

    // 2. Registrar evento como PENDING se não existir
    if (!existingEvent) {
      await this.webhookEventRepository.save({
        id: event.id,
        type: event.type,
        status: 'PENDING',
        createdAt: new Date(),
      });
    }

    // 3. Processar lógica de negócio
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          const payment = await this.paymentRepository.findByStripeId(paymentIntent.id);
          if (payment) {
            await this.paymentRepository.updateStatus(payment.id, 'SUCCEEDED');
            console.log(`Pagamento ${payment.id} confirmado via Webhook.`);
          }
          break;

        case 'payment_intent.payment_failed':
          const failedIntent = event.data.object;
          const failedPayment = await this.paymentRepository.findByStripeId(failedIntent.id);
          if (failedPayment) {
            await this.paymentRepository.updateStatus(failedPayment.id, 'FAILED');
            console.log(`Pagamento ${failedPayment.id} falhou via Webhook.`);
          }
          break;

        default:
          console.log(`Evento não tratado: ${event.type}`);
      }

      // 4. Marcar como processado
      await this.webhookEventRepository.markAsProcessed(event.id);
    } catch (error) {
      console.error(`Erro ao processar evento ${event.id}:`, error);
      throw error;
    }
  }
}
