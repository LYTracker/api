import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBoardDto } from './dtos/create-board.dto.js';

@Injectable()
export default class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(dto: CreateBoardDto) {
    return this.prisma.board.create({ data: dto });
  }

  public async findOne(id: string) {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (!board) {
      throw new Error(`Board with ID ${id} not found`);
    }
    return board;
  }
}
