import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../../domain/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: IUserRepository,
  ) {}

  async create(user: CreateUserDto): Promise<string> {
    const userCreated = await this.userRepository.create(user);
    return userCreated.id;
  }
}
