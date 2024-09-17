import { Injectable } from '@nestjs/common';
import { Histogram, LabelValues } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { MetricLabelsInterface } from '@testcase/shared/data-access';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('registration_duration_seconds')
    private readonly histogram: Histogram<string>,
  ) {}

  startTimer(userId?: MetricLabelsInterface) {
    return this.histogram.startTimer({user_id: 'yoyoy'});
  }
}
