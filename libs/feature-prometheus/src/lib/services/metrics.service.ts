import { Injectable } from '@nestjs/common';
import { Histogram } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('registration_duration_seconds')
    private readonly histogram: Histogram<string>,
  ) {}

  startTimer() {
    return this.histogram.startTimer();
  }
}
