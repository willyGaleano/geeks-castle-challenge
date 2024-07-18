import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserController } from './presentation/controllers/user.controller';
import { FirebaseAdminModule } from '../../common/infrastructure/firebase/firebase-admin.module';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from './domain/repositories/user.repository';

@Module({
  imports: [FirebaseAdminModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
