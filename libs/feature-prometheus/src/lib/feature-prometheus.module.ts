import { Module } from '@nestjs/common';
import { MetricsService } from './services/metrics.service';
import { makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { MetricsMiddleware } from './middlewares/metrics.middleware';

@Module({
	providers: [
		MetricsMiddleware,
		MetricsService,
		makeHistogramProvider({
			name: 'registration_duration_seconds',
			help: 'Duration of user registration in seconds',
			labelNames: ['status', 'userId'],
			buckets: [0.1, 0.5, 1, 2, 5],
		}),
	],
	exports: [MetricsService],
})
export class MetricsModule {}
