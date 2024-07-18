import { Injectable, Logger } from '@nestjs/common';
import { HealthCheckResponseDto } from '../../domain/health-check.response.dto';

@Injectable()
export class HealthCheckService {
  readonly logger = new Logger(HealthCheckService.name);

  getHealthCheck(): HealthCheckResponseDto {
    this.logger.debug({
      msg: 'Health check',
      data: 'OK',
    });
    return {
      data: 'OK',
    };
  }
}
