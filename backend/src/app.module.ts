import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { People } from './people/people.entity';
import { Address } from './address/address.entity';

import { PeopleController } from './people/people.controller';
import { PeopleService } from './people/people.service';
import { AddressService } from './address/address.service';
import { AuthModule } from './controller/auth.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtMiddleware } from './controller/jwt.middleware';
import { AuthService } from './controller/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'erasmo',
      password: '3727',
      database: 'IBS_SISTEMAS',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([People, Address]),
    JwtModule.register({
      secret: 'erasmo_desafio_IBS',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [PeopleController, AuthController],
  providers: [
    PeopleService,
    AddressService,
    JwtStrategy,
    AuthService,
    JwtMiddleware,
  ],
})
export class AppModule {}
