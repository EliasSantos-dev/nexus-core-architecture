import { z } from 'zod';

export const WebhookEventSchema = z.object({
  id: z.string(), // ID do evento do Stripe (evt_...)
  type: z.string(),
  status: z.enum(['PENDING', 'PROCESSED', 'FAILED']),
  createdAt: z.date(),
  processedAt: z.date().optional(),
});

export type WebhookEvent = z.infer<typeof WebhookEventSchema>;

export interface IWebhookEventRepository {
  findById(id: string): Promise<WebhookEvent | null>;
  save(event: WebhookEvent): Promise<void>;
  markAsProcessed(id: string): Promise<void>;
}
