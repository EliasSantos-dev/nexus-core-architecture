import { Test, TestingModule } from '@nestjs/testing';
import { WebhookProcessorService } from './webhook-processor.service';
import { IPaymentRepository } from '../domain/payment.entity';
import { IWebhookEventRepository } from '../domain/webhook-event.entity';

describe('WebhookProcessorService', () => {
  let service: WebhookProcessorService;
  let paymentRepo: IPaymentRepository;
  let eventRepo: IWebhookEventRepository;

  const mockPaymentRepo = {
    findByStripeId: jest.fn(),
    updateStatus: jest.fn(),
  };

  const mockEventRepo = {
    findById: jest.fn(),
    save: jest.fn(),
    markAsProcessed: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookProcessorService,
        { provide: 'PAYMENT_REPOSITORY', useValue: mockPaymentRepo },
        { provide: 'WEBHOOK_EVENT_REPOSITORY', useValue: mockEventRepo },
      ],
    }).compile();

    service = module.get<WebhookProcessorService>(WebhookProcessorService);
    paymentRepo = module.get<IPaymentRepository>('PAYMENT_REPOSITORY');
    eventRepo = module.get<IWebhookEventRepository>('WEBHOOK_EVENT_REPOSITORY');
  });

  it('deve processar um pagamento bem-sucedido e marcar o evento como processado', async () => {
    const event = { id: 'evt_1', type: 'payment_intent.succeeded', data: { object: { id: 'pi_123' } } };
    mockEventRepo.findById.mockResolvedValue(null);
    mockPaymentRepo.findByStripeId.mockResolvedValue({ id: 'pay_1', status: 'PENDING' });

    await service.processEvent(event);

    expect(paymentRepo.updateStatus).toHaveBeenCalledWith('pay_1', 'SUCCEEDED');
    expect(eventRepo.markAsProcessed).toHaveBeenCalledWith('evt_1');
  });

  it('deve ignorar eventos que já foram processados (Idempotência)', async () => {
    const event = { id: 'evt_1', type: 'payment_intent.succeeded', data: { object: { id: 'pi_123' } } };
    mockEventRepo.findById.mockResolvedValue({ id: 'evt_1', status: 'PROCESSED' });

    await service.processEvent(event);

    expect(paymentRepo.updateStatus).not.toHaveBeenCalled();
    expect(eventRepo.save).not.toHaveBeenCalled();
  });
});
