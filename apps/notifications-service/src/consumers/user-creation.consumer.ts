import { Injectable, Logger } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { Message } from '@aws-sdk/client-sqs';
import { AppleNotificationsService } from '@testcase/feature-apple-notifications';
import { User } from '@testcase/shared/data-access';

@Injectable()
export class UserCreationConsumer {
	constructor(
		private readonly appleNotificationsService: AppleNotificationsService
	) {}

	private readonly logger = new Logger(UserCreationConsumer.name);

	@SqsMessageHandler('user-created', false)
	async handleUserCreatedEvent(message: Message) {
		try {
			const { Body, MessageAttributes = {} } = message;
			const user: User = JSON.parse(Body);

			const delayAttribute = MessageAttributes['X-Delay'];
			if (delayAttribute) {
				const { StringValue: delayValue } = delayAttribute;
				const delay = parseInt(delayValue, 10);
				await this.delayProcessing(delay);
			}

			const { deviceToken, ...payload } = user;
			await this.appleNotificationsService.sendPushNotification(
				deviceToken,
				payload
			);
		} catch (e) {
			this.logger.error(e);
		}
	}

	private delayProcessing(delay: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, delay));
	}
}
