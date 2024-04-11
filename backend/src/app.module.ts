import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { People } from './people/people.entity';
import { Address } from './address/address.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleController } from './people/people.controller';
import { PeopleService } from './people/people.service';
import { AddressService } from './address/address.service';

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
      synchronize: true, // APENAS development!!!!!!
    }),
    SequelizeModule.forFeature([People, Address]),
  ],
  controllers: [AppController, PeopleController],
  providers: [AppService, PeopleService, AddressService],
})
export class AppModule {}
