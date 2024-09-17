import { Injectable, Logger } from '@nestjs/common';

// import * as apn from 'apn';

@Injectable()
export class AppleNotificationsService {
	// private apnProvider: apn.Provider;
	private readonly logger = new Logger(AppleNotificationsService.name);

	constructor() {
		// this.apnProvider = new apn.Provider({
		// 	token: {
		// 		key: "path/to/AuthKey_XXXXXXXXXX.p8",
		// 		keyId: "key-id",
		// 		teamId: "developer-team-id",
		// 	},
		// 	production: false,
		// });
	}

	async sendPushNotification<TPayload = unknown>(
		deviceToken: string,
		payload: TPayload
	) {
		// const notification = new apn.Notification({
		// 	alert: "New event notification!",
		// 	payload: payload,
		// 	topic: "com.app.bundleId",
		// });

		try {
			// const result = await this.apnProvider.send(notification, deviceToken);
			// this.logger.log('Push notification sent successfully:', result);
			this.logger.log(
				`Simulating push notification, user was created: ${JSON.stringify(
					payload
				)}`
			);
			this.logger.log(`Payload: ${JSON.stringify(payload)}`);
		} catch (error) {
			this.logger.error('Error sending push notification:', error);
		}
	}
}
