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
    if (!peopleData) {
      throw new Error('Dados da pessoa não fornecidos');
    }

    const { name, sex, birthDate, maritalStatus, addresses } = peopleData;
    if (!name || !sex || !birthDate || !maritalStatus) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (typeof name !== 'string') {
      throw new Error('O campo "name" deve ser uma string');
    }

    let createdPerson: People;
    await this.sequelize.transaction(async (transaction) => {
      createdPerson = await this.peopleModel.create(
        { name, sex, birthDate, maritalStatus },
        { transaction },
      );

      if (addresses && addresses.length > 0) {
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
  async findAll(): Promise<any[]> {
    const people = await this.peopleModel.findAll({ include: [Address] });

    // mensagem para cada usuario
    const peopleWithMessages = people.map((person) => {
      const today = new Date();
      const birthday = new Date(person.birthDate);
      const age = today.getFullYear() - birthday.getFullYear();

      birthday.setFullYear(today.getFullYear()); // Define o ano de aniversário para o ano atual

      // Verifica se é o dia do aniversário
      if (
        birthday.getMonth() === today.getMonth() &&
        birthday.getDate() === today.getDate()
      ) {
        // Se for o aniversario do usuario fica avisado
        return {
          ...person.toJSON(),
          message: ` De parabéns ao usuario ${person.name} hoje ele faz ${age} anos.`,
        };
      } else {
        // Calcula quantos dias faltam para o próximo aniversário
        let differenceInDays = Math.floor(
          (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );

        // calcula dias para o próximo aniversario
        if (differenceInDays < 0) {
          birthday.setFullYear(today.getFullYear() + 1);
          differenceInDays = Math.floor(
            (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
          );
        }

        return {
          ...person.toJSON(),
          message: `Faltam ${differenceInDays} dias para o aniversário do usuario ${person.name}.`,
        };
      }
    });

    return peopleWithMessages;
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
