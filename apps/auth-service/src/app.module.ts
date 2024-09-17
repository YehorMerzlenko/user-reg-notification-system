import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { UsersModule } from './modules/users/users.module';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MetricsModule } from '@testcase/feature-prometheus';
import { MetricsMiddleware } from '@testcase/feature-prometheus';
import { SQS } from '@aws-sdk/client-sqs';

@Module({
	imports: [
		PrometheusModule.register(),
		MetricsModule,
		UsersModule,
		SqsModule.register({
			consumers: [],
			producers: [
				{
					name: 'user-created',
					queueUrl: 'user-created',
					sqs: new SQS({
						endpoint: 'http://localhost:4566',
						region: 'eu-central-1',
						credentials: {
							accessKeyId: 'accessKeyId',
							secretAccessKey: 'accessKeyId'
						}
					})
				}
			],
		}),
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(MetricsMiddleware).forRoutes('*');
	}
}
