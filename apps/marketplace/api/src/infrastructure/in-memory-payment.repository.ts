import { Payment, IPaymentRepository } from '../domain/payment.entity';

export class InMemoryPaymentRepository implements IPaymentRepository {
  private payments: Payment[] = [];

  async save(payment: Payment): Promise<Payment> {
    this.payments.push(payment);
    return payment;
  }

  async findById(id: string): Promise<Payment | null> {
    return this.payments.find((p) => p.id === id) || null;
  }

  async findByStripeId(stripeId: string): Promise<Payment | null> {
    return this.payments.find((p) => p.stripePaymentIntentId === stripeId) || null;
  }

  async updateStatus(id: string, status: Payment['status']): Promise<void> {
    const payment = this.payments.find((p) => p.id === id);
    if (payment) {
      payment.status = status;
    }
  }
}
