import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { MetricsService } from '../../metrics/metrics.service';
import { MySqsService } from '../aws/sqs.service';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly metricsService: MetricsService,
    private readonly sqsService: MySqsService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const end = this.metricsService.startTimer();

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    await this.sqsService.sendMessage(
      'user.created',
      {
        id: user.id,
        email: user.email,
      },
      5000,
    );

    end();

    return { message: 'User registered successfully' };
  }
}
