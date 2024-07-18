import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from '../../common/infrastructure/firebase/firebase-admin.module';
import { CUSTOMER_REPOSITORY_TOKEN } from './domain/repositories/customer.repository';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';
import { CustomerService } from './application/services/customer.service';
import { CustomerController } from './presentation/controllers/customer.controller';

@Module({
  imports: [FirebaseAdminModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: CUSTOMER_REPOSITORY_TOKEN,
      useClass: CustomerRepository,
    },
  ],
})
export class CustomerModule {}
