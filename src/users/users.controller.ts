import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('users')
export default class UsersController {
  @Get('profile')
  public async getProfile() {
    return { message: 'This is the user profile' };
  }
}
