import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { UserCreationConsumer } from './consumers';
import { FeatureAppleNotificationsModule } from '@testcase/feature-apple-notifications';
import { SQS } from '@aws-sdk/client-sqs';
import process from 'node:process';

@Module({
	imports: [
		SqsModule.register({
			consumers: [
				{
					name: process.env.SQS_QUEUE_NAME,
					queueUrl: 'user-created',
					messageAttributeNames: ['X-Delay'],
					sqs: new SQS({
						endpoint: process.env.SQS_ENDPOINT,
						region: process.env.AWS_REGION,
						credentials: {
							accessKeyId: 'accessKeyId',
							secretAccessKey: 'accessKeyId'
						}
					})
				}
			],
		}),
		FeatureAppleNotificationsModule,
	],
	providers: [UserCreationConsumer],
})
export class AppModule {}
