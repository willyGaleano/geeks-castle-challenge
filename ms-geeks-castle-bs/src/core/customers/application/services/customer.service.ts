import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY_TOKEN,
  ICustomerRepository,
} from '../../domain/repositories/customer.repository';
import { CreateCustomerDto } from '../../domain/dtos/create-customer.dto';
import { UpdateCustomerDto } from '../../domain/dtos/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_TOKEN)
    private customerRepository: ICustomerRepository,
  ) {}

  async create(customer: CreateCustomerDto): Promise<string> {
    const customerCreated = await this.customerRepository.create(customer);
    return customerCreated.id;
  }

  async update(id: string, customer: UpdateCustomerDto): Promise<string> {
    const customerUpdated = await this.customerRepository.update(id, customer);
    return customerUpdated.id;
  }
}
