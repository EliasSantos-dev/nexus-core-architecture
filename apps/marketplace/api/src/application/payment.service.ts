import { Injectable, Inject } from '@nestjs/common';
import { Payment, IPaymentGateway, IPaymentRepository } from '../domain/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_GATEWAY')
    private readonly paymentGateway: IPaymentGateway,
    @Inject('PAYMENT_REPOSITORY')
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async checkout(orderId: string, customerId: string, amount: number): Promise<{ paymentId: string; clientSecret: string }> {
    const { id: stripeId, clientSecret } = await this.paymentGateway.createPaymentIntent(amount, 'usd', { orderId, customerId });

    const payment: Payment = {
      id: crypto.randomUUID(),
      amount,
      currency: 'usd',
      status: 'PENDING',
      orderId,
      customerId,
      stripePaymentIntentId: stripeId,
    };

    await this.paymentRepository.save(payment);

    return {
      paymentId: payment.id,
      clientSecret,
    };
  }
}
