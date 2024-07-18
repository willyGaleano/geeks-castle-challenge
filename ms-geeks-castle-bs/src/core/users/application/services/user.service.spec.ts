import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { USER_REPOSITORY_TOKEN } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: {
    create: jest.Mock;
  };

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer and return its id', async () => {
      mockUserRepository.create.mockResolvedValue({ id: '123' });

      const customer: CreateUserDto = {
        username: 'Juan Luis',
        email: 'juan@gmail.com',
      };
      const result = await service.create(customer);
      expect(result).toEqual('123');
      expect(mockUserRepository.create).toHaveBeenCalledWith(customer);
    });
  });
});
