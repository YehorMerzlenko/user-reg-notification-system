import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsMiddleware } from './modules/metrics/metrics.middleware';
import { MetricsModule } from './modules/metrics/metrics.module';
import { UsersModule } from './modules/users/users.module';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    PrometheusModule.register(),
    MetricsModule,
    UsersModule,
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: 'user-created-queue',
          queueUrl: process.env.SQS_QUEUE_URL,
          region: process.env.AWS_REGION,
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
