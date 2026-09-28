import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import Bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from '../config/bcrypt.config.js';
import CreateUserDto from './dtos/create-user.dto.js';

@Injectable()
export default class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException(
        `User with email ${dto.email} already exists`,
      );
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await Bcrypt.hash(dto.password, SALT_OR_ROUNDS),
      },
    });

    return this.sanitize(newUser);
  }

  public async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });

    return user;
  }

  public async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  private sanitize(user: any) {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
