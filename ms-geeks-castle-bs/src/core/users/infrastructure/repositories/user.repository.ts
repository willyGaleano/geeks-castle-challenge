import { ConflictException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { FirebaseAdminService } from '../../../../common/infrastructure/firebase/firebase-admin.service';
import {
  SALT_OR_ROUNDS_BYCRYPT_DEFAULT,
  USER_DOCUMENT_NAME,
} from '../../domain/constants/database.constant';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);
  private readonly firestore: FirebaseFirestore.Firestore;
  private readonly usersCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private readonly firebaseAdminService: FirebaseAdminService) {
    this.firestore = this.firebaseAdminService.firestore;
    this.usersCollection = this.firestore.collection(USER_DOCUMENT_NAME);
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    this.logger.debug({ msg: 'Creating user', user });

    const snapshot = await this.usersCollection
      .where('email', '==', user.email)
      .get();

    if (!snapshot.empty) throw new ConflictException('User already exists');

    const userRef = await this.usersCollection.add({
      ...user,
      password: user.password
        ? await bcrypt.hash(user.password, SALT_OR_ROUNDS_BYCRYPT_DEFAULT)
        : null,
    });

    this.logger.debug({ msg: 'User created', userRef });

    return userRef.get().then((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as UserEntity;
    });
  }
}
