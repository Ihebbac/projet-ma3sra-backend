// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsersService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.auth.validateUser(dto.email, dto.password);
    const tokens = await this.auth.signTokens(user);
    return {
      ...tokens,
      user: this.users.sanitize(user),
    };
  }
}
