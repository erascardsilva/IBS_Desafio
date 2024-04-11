import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) {}

  async findAll(): Promise<Address[]> {
    return this.addressModel.findAll();
  }

  async findById(id: number): Promise<Address | null> {
    return this.addressModel.findByPk(id);
  }

  async create(addressData: Partial<Address>): Promise<Address> {
    return this.addressModel.create(addressData);
  }

  async update(
    id: number,
    addressData: Partial<Address>,
  ): Promise<Address | null> {
    const address = await this.addressModel.findByPk(id);
    if (!address) {
      return null;
    }
    await address.update(addressData);
    return address;
  }

  async delete(id: number): Promise<void> {
    await this.addressModel.destroy({ where: { id } });
  }
}
