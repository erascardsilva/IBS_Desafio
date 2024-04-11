import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../controller/auth.guard';
import { People } from './people.entity';
import { PeopleService } from './people.service';
import { Address } from '../address/address.entity';

@Controller('peoples')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<People[]> {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<People | null> {
    return this.peopleService.findById(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() peopleData: Partial<People>): Promise<People> {
    try {
      const createdPerson = await this.peopleService.create(peopleData);
      return createdPerson;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar a pessoa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() peopleData: Partial<People>,
  ): Promise<People | null> {
    return this.peopleService.update(+id, peopleData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.peopleService.delete(+id);
  }

  @Post(':id/addresses')
  @UseGuards(JwtAuthGuard)
  async addAddressToPeople(
    @Param('id') id: string,
    @Body() addressData: Partial<Address>,
  ): Promise<People | null> {
    return this.peopleService.addAddressToPeople(+id, addressData);
  }

  @Put(':id/addresses/:addressId')
  @UseGuards(JwtAuthGuard)
  async updateAddress(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
    @Body() addressData: Partial<Address>,
  ): Promise<Address | null> {
    return this.peopleService.updateAddress(+id, +addressId, addressData);
  }

  @Delete(':id/addresses/:addressId')
  @UseGuards(JwtAuthGuard)
  async removeAddressFromPeople(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
  ): Promise<void> {
    return this.peopleService.removeAddressFromPeople(+id, +addressId);
  }
}
