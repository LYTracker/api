import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import BoardsService from './boards.service.js';
import { CreateBoardDto } from './dtos/create-board.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export default class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Post()
  public async createBoard(@Body() dto: CreateBoardDto) {
    return this.boardService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async findOne(
    @CurrentUser() user: { userId: string; email: string },
    @Param('id') id: string,
  ) {
    return this.boardService.findOne({ boardId: id, userId: user.userId });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async findAll(@CurrentUser() user: { userId: string; email: string }) {
    return this.boardService.findAll(user.userId);
  }
}
