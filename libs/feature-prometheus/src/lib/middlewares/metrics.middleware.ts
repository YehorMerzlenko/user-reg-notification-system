import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../services/metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
	constructor(private readonly metricsService: MetricsService) {}

	use(req: Request, res: Response, next: NextFunction) {
		const end = this.metricsService.startTimer();
		res.on('finish', () => {
			end();
		});
		next();
	}
}
