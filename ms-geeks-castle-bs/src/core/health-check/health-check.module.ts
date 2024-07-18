import { Module } from '@nestjs/common';
import { HealthCheckController } from './infrastructure/controllers/health-check.controller';
import { HealthCheckService } from './application/services/health-check.service';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
