import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { People } from './people.entity';
import { Address } from '../address/address.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People)
    private readonly peopleModel: typeof People,
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
    private readonly sequelize: Sequelize,
  ) {}

  async create(peopleData: Partial<People>): Promise<People> {
    // Verificar se os dados da pessoa estão definidos
    if (!peopleData) {
      throw new Error('Dados da pessoa não fornecidos');
    }

    // Verificar se todos os campos obrigatórios estão presentes
    const { name, sex, birthDate, maritalStatus, addresses } = peopleData;
    if (!name || !sex || !birthDate || !maritalStatus) {
      throw new Error('Todos os campos são obrigatórios');
    }

    // Verificar se o campo 'name' é uma string
    if (typeof name !== 'string') {
      throw new Error('O campo "name" deve ser uma string');
    }

    // Criar a pessoa com os dados fornecidos
    let createdPerson: People;
    await this.sequelize.transaction(async (transaction) => {
      // Criar a pessoa
      createdPerson = await this.peopleModel.create(
        { name, sex, birthDate, maritalStatus },
        { transaction },
      );

      // Verificar se foram fornecidos endereços
      if (addresses && addresses.length > 0) {
        // Criar cada endereço associado à pessoa
        for (const addressData of addresses) {
          await this.addressModel.create(
            { ...addressData, peopleId: createdPerson.id },
            { transaction },
          );
        }
      }
    });

    return createdPerson;
  }

  async findAll(): Promise<People[]> {
    return this.peopleModel.findAll({ include: [Address] });
  }

  async findById(id: number): Promise<People | null> {
    const people = await this.peopleModel.findByPk(id, { include: [Address] });
    if (!people) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return people;
  }

  async update(
    id: number,
    peopleData: Partial<People>,
  ): Promise<People | null> {
    const people = await this.peopleModel.findByPk(id);
    if (!people) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    await people.update(peopleData);
    return people;
  }

  async delete(id: number): Promise<void> {
    const people = await this.peopleModel.findByPk(id);
    if (!people) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    await people.destroy();
  }

  async addAddressToPeople(
    peopleId: number,
    addressData: Partial<Address>,
  ): Promise<People | null> {
    const people = await this.peopleModel.findByPk(peopleId);
    if (!people) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    const address = await this.addressModel.create(addressData);
    await people.$add('addresses', address);
    return people.reload();
  }

  async updateAddress(
    peopleId: number,
    addressId: number,
    addressData: Partial<Address>,
  ): Promise<Address | null> {
    const address = await this.addressModel.findByPk(addressId);
    if (!address || address.peopleId !== peopleId) {
      throw new NotFoundException('Endereço não encontrado para esta pessoa');
    }
    await address.update(addressData);
    return address.reload();
  }

  async removeAddressFromPeople(
    peopleId: number,
    addressId: number,
  ): Promise<void> {
    const address = await this.addressModel.findByPk(addressId);
    if (!address || address.peopleId !== peopleId) {
      throw new NotFoundException('Endereço não encontrado para esta pessoa');
    }
    await address.destroy();
  }
}
