import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseAdminService } from '../../../../common/infrastructure/firebase/firebase-admin.service';
import { ICustomerRepository } from '../../domain/repositories/customer.repository';
import { CreateCustomerDto } from '../../domain/dtos/create-customer.dto';
import { CustomerEntity } from '../../domain/entities/customer.entity';
import { UpdateCustomerDto } from '../../domain/dtos/update-customer.dto';
import { CUSTOMER_DOCUMENT_NAME } from '../../domain/constants/database.constant';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  private readonly logger = new Logger(CustomerRepository.name);
  private readonly firestore: FirebaseFirestore.Firestore;
  private readonly customersCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly firebaseAdminService: FirebaseAdminService) {
    this.firestore = this.firebaseAdminService.firestore;
    this.customersCollection = this.firestore.collection(
      CUSTOMER_DOCUMENT_NAME,
    );
  }

  async create(customer: CreateCustomerDto): Promise<CustomerEntity> {
    this.logger.debug({ msg: 'Creating customer', customer });

    const snapshot = await this.customersCollection
      .where('name', '==', customer.name)
      .get();

    if (!snapshot.empty) throw new ConflictException('Customer already exists');

    const customerRef = await this.customersCollection.add({
      ...customer,
    });

    this.logger.debug({ msg: 'Customer created', customerRef });

    const customerDoc = await customerRef.get();

    return {
      id: customerDoc.id,
      ...customerDoc.data(),
    } as CustomerEntity;
  }

  async update(
    id: string,
    customer: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const customerRef = this.customersCollection.doc(id);
    await customerRef.update({
      ...customer,
    });

    this.logger.debug({ msg: 'Customer updated', customer });

    const customerDoc = await customerRef.get();

    if (!customerDoc.exists) throw new NotFoundException('Customer not found');

    return {
      id: customerDoc.id,
      ...customerDoc.data(),
    } as CustomerEntity;
  }
}
