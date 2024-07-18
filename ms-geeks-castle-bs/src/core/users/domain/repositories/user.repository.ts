import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export const USER_REPOSITORY_TOKEN = 'IUserRepository';

export interface IUserRepository {
  create(user: CreateUserDto): Promise<UserEntity>;
}
