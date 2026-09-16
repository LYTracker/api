import { forwardRef, Module } from '@nestjs/common';
import BoardsService from './boards.service.js';
import BoardsController from './boards.controller.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [BoardsService],
  controllers: [BoardsController],
  exports: [BoardsService],
})
export class BoardsModule {}
