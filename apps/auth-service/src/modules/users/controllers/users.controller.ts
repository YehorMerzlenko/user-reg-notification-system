import { Controller, Post, Body, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'crypto';
import { SqsService } from '@ssut/nestjs-sqs';
import { MetricsService } from '@testcase/feature-prometheus';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly sqsService: SqsService,
		private readonly metricsService: MetricsService
	) {}

	@Post('register')
	async register(
		@Body() createUserDto: CreateUserDto,
		@Query('delay') delay?: string
	) {
		const end = this.metricsService.startTimer();
		const user = await this.usersService.register(createUserDto);

		const messageAttributes = delay
			? {
					'X-Delay': {
						DataType: 'Number',
						StringValue: delay,
					},
			  }
			: {};

		await this.sqsService.send('user-created', {
			id: randomUUID(),
			body: user,
			messageAttributes,
		});

		end();
		return { message: 'User registered successfully' };
	}
}
