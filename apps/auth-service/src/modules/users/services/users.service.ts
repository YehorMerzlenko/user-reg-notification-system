import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async register({ password: rowPassword, email }: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(rowPassword, 10);
		const { password, ...user } = await this.prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		return user;
	}
}
