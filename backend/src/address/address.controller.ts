import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Address | null> {
    return this.addressService.findById(+id);
  }

  @Post()
  create(@Body() addressData: Partial<Address>): Promise<Address> {
    return this.addressService.create(addressData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() addressData: Partial<Address>,
  ): Promise<Address | null> {
    return this.addressService.update(+id, addressData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.addressService.delete(+id);
  }
}
