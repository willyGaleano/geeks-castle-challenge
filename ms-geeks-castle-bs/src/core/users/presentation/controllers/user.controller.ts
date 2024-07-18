import { Controller, Post, Body, Logger, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { ResponseWrapper } from '../../../../common/domain/wrappers/response-wrapper';

@ApiTags('Users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseWrapper<{ id: string }>> {
    try {
      const respId = await this.userService.create(createUserDto);
      return new ResponseWrapper({ id: respId });
    } catch (error) {
      this.logger.error({
        msg: 'Error creating user',
        errorMsg: error.message,
      });
      return new ResponseWrapper(null, error.message);
    }
  }
}
