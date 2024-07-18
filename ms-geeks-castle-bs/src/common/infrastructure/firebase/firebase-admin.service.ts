import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { EnvironmentVariables } from '../../domain/envs/envs.schema';
import { NodeEnv } from '../../domain/envs/envs.model';

@Injectable()
export class FirebaseAdminService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this.configService.get('FIREBASE_PROJECT_ID'),
        privateKey: this.configService
          .get('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
        clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
      }),
      databaseURL: this.configService.get('FIREBASE_DATABASE_URL'),
    });

    if (this.configService.get('NODE_ENV') === NodeEnv.DEVELOPMENT)
      process.env.FIRESTORE_EMULATOR_HOST = 'localhost:5010';
  }

  get firestore() {
    return admin.firestore();
  }
}
