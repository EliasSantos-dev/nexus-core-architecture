import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { IPaymentGateway, IPaymentRepository } from '../domain/payment.entity';

describe('PaymentService', () => {
  let service: PaymentService;
  let gateway: IPaymentGateway;
  let repository: IPaymentRepository;

  const mockGateway = {
    createPaymentIntent: jest.fn().mockResolvedValue({ id: 'pi_123', clientSecret: 'secret_123' }),
  };

  const mockRepository = {
    save: jest.fn().mockImplementation((payment) => Promise.resolve(payment)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: 'PAYMENT_GATEWAY', useValue: mockGateway },
        { provide: 'PAYMENT_REPOSITORY', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    gateway = module.get<IPaymentGateway>('PAYMENT_GATEWAY');
    repository = module.get<IPaymentRepository>('PAYMENT_REPOSITORY');
  });

  it('deve criar um checkout com sucesso e salvar como PENDING', async () => {
    const result = await service.checkout('order-1', 'customer-1', 100);

    expect(result).toEqual({
      paymentId: expect.any(String),
      clientSecret: 'secret_123',
    });
    expect(gateway.createPaymentIntent).toHaveBeenCalledWith(100, 'usd', { orderId: 'order-1', customerId: 'customer-1' });
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      status: 'PENDING',
      stripePaymentIntentId: 'pi_123',
    }));
  });
});
