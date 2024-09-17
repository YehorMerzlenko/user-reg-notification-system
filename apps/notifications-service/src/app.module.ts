import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { UserCreationConsumer } from './consumers';

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'user-created-queue',
          queueUrl: 'http://localhost:4566/000000000000/user_created',
          region: 'us-east-1',
          messageAttributeNames: ['X-Delay'],
          pollingWaitTimeMs: 20 * 1000,
        },
      ],
    }),
  ],
  providers: [UserCreationConsumer],
})
export class AppModule {}
