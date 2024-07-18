import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';

export const CUSTOMER_REPOSITORY_TOKEN = 'ICustomerRepository';

export interface ICustomerRepository {
  create(customer: CreateCustomerDto): Promise<CustomerEntity>;
  update(id: string, customer: UpdateCustomerDto): Promise<CustomerEntity>;
}
