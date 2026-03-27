import { z } from 'zod';

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3).default('USD'),
  status: z.enum(['PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED']),
  orderId: z.string().uuid(),
  customerId: z.string().uuid(),
  stripePaymentIntentId: z.string().optional(),
});

export type Payment = z.infer<typeof PaymentSchema>;

export interface IPaymentGateway {
  createPaymentIntent(amount: number, currency: string, metadata: Record<string, any>): Promise<{ id: string; clientSecret: string }>;
  handleWebhook(payload: any, signature: string): Promise<void>;
}

export interface IPaymentRepository {
  save(payment: Payment): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  findByStripeId(stripeId: string): Promise<Payment | null>;
  updateStatus(id: string, status: Payment['status']): Promise<void>;
}
