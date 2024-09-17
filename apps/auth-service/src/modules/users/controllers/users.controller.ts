import { Controller, Post, Body } from '@nestjs/common';
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
	async register(@Body() createUserDto: CreateUserDto) {
		const end = this.metricsService.startTimer();

		const user = await this.usersService.register(createUserDto);

		await this.sqsService.send('user-created', {
			id: randomUUID(),
			body: user,
			messageAttributes: {
				'X-Delay': {
					DataType: 'Number',
					StringValue: '5000',
				},
			},
		});

		end()
		return 'all done';
	}
}
