import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  async login(
    @Body() credentials: { username: string; password: string },
  ): Promise<{ token: string }> {
    const { username, password } = credentials;

    if (username === 'erasmo' && password === '3727') {
      const token = this.jwtService.sign({ username });
      return { token };
    } else {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }
  }
}
