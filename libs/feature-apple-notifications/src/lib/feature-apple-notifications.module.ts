import { Module } from '@nestjs/common';
import { AppleNotificationsService } from './services/apple-notifications.service';

@Module({
	providers: [AppleNotificationsService],
	exports: [AppleNotificationsService]
})
export class FeatureAppleNotificationsModule {}
