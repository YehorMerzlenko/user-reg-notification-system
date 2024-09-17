import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { UserCreationConsumer } from './consumers';
import { FeatureAppleNotificationsModule } from '@testcase/feature-apple-notifications';
import { SQS } from '@aws-sdk/client-sqs';

@Module({
	imports: [
		SqsModule.register({
			consumers: [
				{
					name: 'user-created',
					queueUrl: 'user-created',
					messageAttributeNames: ['X-Delay'],
					pollingWaitTimeMs: 20 * 1000,
					sqs: new SQS({
						endpoint: 'http://localhost:4566',
						region: 'eu-central-1',
						credentials: {
							accessKeyId: 'accessKeyId',
							secretAccessKey: 'accessKeyId',
						},
					}),
				},
			],
		}),
		FeatureAppleNotificationsModule,
	],
	providers: [UserCreationConsumer],
})
export class AppModule {}
