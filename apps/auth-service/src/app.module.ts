import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { UsersModule } from './modules/users/users.module';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MetricsModule } from '@testcase/feature-prometheus';
import { MetricsMiddleware } from '@testcase/feature-prometheus';
import { SQS } from '@aws-sdk/client-sqs';
import * as process from 'node:process';

@Module({
	imports: [
		PrometheusModule.register(),
		MetricsModule,
		UsersModule,
		SqsModule.register({
			producers: [
				{
					name: process.env.SQS_QUEUE_NAME,
					queueUrl: 'user-created',
					sqs: new SQS({
						endpoint: process.env.SQS_ENDPOINT,
						region: process.env.AWS_REGION,
						credentials: {
							accessKeyId: 'accessKeyId',
							secretAccessKey: 'accessKeyId',
						},
					}),
				},
			],
		}),
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(MetricsMiddleware).forRoutes('*');
	}
}
