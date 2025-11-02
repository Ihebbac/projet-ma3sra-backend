// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Identifiants invalides');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Identifiants invalides');

    return user;
  }

  async signTokens(user: any) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      roles: user.roles ?? ['user'],
    };

    const access_token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'dev_access_secret',
      expiresIn: '15m',
    });

    const refresh_token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret',
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }
}
