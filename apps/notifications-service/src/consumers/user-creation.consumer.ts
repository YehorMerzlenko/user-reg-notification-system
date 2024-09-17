import { Injectable, Logger } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { Message } from "@aws-sdk/client-sqs";

@Injectable()
export class UserCreationConsumer {
  private readonly logger = new Logger(UserCreationConsumer.name);

  @SqsMessageHandler('user-created-queue', false)
  async handleUserCreatedEvent(message: Message) {
    console.log(message);
    const event = JSON.parse(message.Body);
    console.log('message.MessageAttributes:', message.MessageAttributes);
    // const delay = message.MessageAttributes?.['X-Delay']?.StringValue || 0;

    // if (delay) {
    //   await this.delayProcessing(delay);
    // }

    await this.sendPushNotification(event);

    this.logger.log('Event processed successfully');
  }

  private delayProcessing(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  private async sendPushNotification(event: any) {
    const deviceToken = event.deviceToken; // Приклад отримання токену пристрою з події
    // const notification = new apn.Notification({
    //   alert: 'New user registered!',
    //   payload: { userId: event.userId },
    //   topic: 'com.yourapp.bundleId', // Bundle ID вашого додатку
    // });

    try {
      // const result = await this.apnProvider.send(notification, deviceToken);
      // this.logger.log('Push notification sent successfully:', result);
      this.logger.log('Push notification sent successfully:', deviceToken);
    } catch (error) {
      this.logger.error('Error sending push notification:', error);
    }
  }
}
