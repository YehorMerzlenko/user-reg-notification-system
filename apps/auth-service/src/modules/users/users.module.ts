import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MetricsModule } from '@testcase/feature-prometheus';

@Module({
	imports: [PrismaModule, MetricsModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
