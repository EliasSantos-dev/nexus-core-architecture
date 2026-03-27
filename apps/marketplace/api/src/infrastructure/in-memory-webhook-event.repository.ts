import { WebhookEvent, IWebhookEventRepository } from '../domain/webhook-event.entity';

export class InMemoryWebhookEventRepository implements IWebhookEventRepository {
  private events: WebhookEvent[] = [];

  async findById(id: string): Promise<WebhookEvent | null> {
    return this.events.find((e) => e.id === id) || null;
  }

  async save(event: WebhookEvent): Promise<void> {
    this.events.push(event);
  }

  async markAsProcessed(id: string): Promise<void> {
    const event = this.events.find((e) => e.id === id);
    if (event) {
      event.status = 'PROCESSED';
      event.processedAt = new Date();
    }
  }
}
