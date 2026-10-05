import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBoardDto } from './dtos/create-board.dto.js';

@Injectable()
export default class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(dto: CreateBoardDto) {
    return this.prisma.board.create({ data: dto });
  }

  public async findOne({
    boardId,
    userId,
  }: {
    boardId: string;
    userId: string;
  }) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId, ownerId: userId },
      include: { nodes: true },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    return board;
  }

  public async findAll(userId: string) {
    return this.prisma.board.findMany({
      where: {
        ownerId: userId,
        deletedAt: null,
      },
    });
  }
}
