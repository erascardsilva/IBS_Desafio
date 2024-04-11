import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (req.path === '/auth/login' && req.method === 'POST') {
      next();
      return;
    }

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        (req as any).user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
      }
    } else {
      res.status(401).json({ message: 'Token não fornecido' });
    }
  }
}
