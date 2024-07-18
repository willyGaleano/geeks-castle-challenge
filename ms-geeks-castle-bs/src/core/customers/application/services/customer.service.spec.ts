import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CUSTOMER_REPOSITORY_TOKEN } from '../../domain/repositories/customer.repository';
import { CreateCustomerDto } from '../../domain/dtos/create-customer.dto';
import { UpdateCustomerDto } from '../../domain/dtos/update-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let mockCustomerRepository: {
    create: jest.Mock;
    update: jest.Mock;
  };

  beforeEach(async () => {
    mockCustomerRepository = {
      create: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CUSTOMER_REPOSITORY_TOKEN,
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer and return its id', async () => {
      mockCustomerRepository.create.mockResolvedValue({ id: '123' });

      const customer: CreateCustomerDto = {
        name: 'Juan Luis',
        lastname: 'Perez Mesa',
        birthday: '1996-01-01',
      };
      const result = await service.create(customer);
      expect(result).toEqual('123');
      expect(mockCustomerRepository.create).toHaveBeenCalledWith(customer);
    });
  });

  describe('update', () => {
    it('should update a customer and return its id', async () => {
      mockCustomerRepository.update.mockResolvedValue({ id: '123' });

      const customer: UpdateCustomerDto = {
        birthday: '1995-01-01',
      };
      const id = '123';
      const result = await service.update(id, customer);
      expect(result).toEqual(id);
      expect(mockCustomerRepository.update).toHaveBeenCalledWith(id, customer);
    });
  });
});
