import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import BoardsService from './boards.service.js';
import { CreateBoardDto } from './dtos/create-board.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export default class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Post()
  public async createBoard(@Body() dto: CreateBoardDto) {
    return this.boardService.create(dto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }
}
