import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (username === 'erasmo' && password === '3727') {
      return { username: 'erasmo' };
    }
    return null;
  }

  async generateToken(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
