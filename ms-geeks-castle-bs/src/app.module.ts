import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { GlobalConfig } from './common/domain/envs/envs.model';
import { getConfigLogger } from './common/infrastructure/settings/logger/logger.config';
import configuration from './common/infrastructure/settings/env-vars/global.config';
import { HealthCheckModule } from './core/health-check/health-check.module';
import { FirebaseAdminModule } from './common/infrastructure/firebase/firebase-admin.module';
import { UserModule } from './core/users/user.module';
import { CustomerModule } from './core/customers/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<GlobalConfig>) => {
        return getConfigLogger(configService);
      },
      inject: [ConfigService],
    }),
    HealthCheckModule,
    FirebaseAdminModule,
    UserModule,
    CustomerModule,
  ],
})
export class AppModule {}
