import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../../application/services/customer.service';
import { CreateCustomerDto } from '../../domain/dtos/create-customer.dto';
import { ResponseWrapper } from '../../../../common/domain/wrappers/response-wrapper';
import { UpdateCustomerDto } from '../../domain/dtos/update-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Customer created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() payload: CreateCustomerDto,
  ): Promise<ResponseWrapper<{ id: string }>> {
    try {
      const respId = await this.customerService.create(payload);
      return new ResponseWrapper({ id: respId });
    } catch (error) {
      this.logger.error({
        msg: 'Error creating customer',
        errorMsg: error.message,
      });
      return new ResponseWrapper(null, error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Customer updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateCustomerDto,
  ): Promise<ResponseWrapper<{ id: string }>> {
    try {
      const respId = await this.customerService.update(id, payload);
      return new ResponseWrapper({ id: respId });
    } catch (error) {
      this.logger.error({
        msg: 'Error updating customer',
        errorMsg: error.message,
      });
      return new ResponseWrapper(null, error.message);
    }
  }
}
