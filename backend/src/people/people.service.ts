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

  async create(peopleData: Partial<People>): Promise<any> {
    // Criar a pessoa
    const createdPerson = await this.peopleModel.create(peopleData);

    // Verificar se foram fornecidos endereços
    if (peopleData.addresses && peopleData.addresses.length > 0) {
      // Criar os endereços e associá-los à pessoa
      const addresses = await Promise.all(
        peopleData.addresses.map((addressData) =>
          this.addressModel.create(addressData),
        ),
      );
      await createdPerson.$set('addresses', addresses);
    }

    // Gerar a mensagem de aniversário
    const message = this.generateBirthdayMessage(createdPerson);

    // Retornar a pessoa criada junto com a mensagem
    return { ...createdPerson.toJSON(), message };
  }

  async findAll(): Promise<any[]> {
    const people = await this.peopleModel.findAll({ include: [Address] });
    const peopleWithMessages = people.map((person) =>
      this.generatePersonMessage(person),
    );
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

  private generateBirthdayMessage(person: People): string {
    const today = new Date();
    const birthday = new Date(person.birthDate);
    birthday.setFullYear(today.getFullYear()); // Define o ano de aniversário para o ano atual

    // Se o aniversário já passou este ano, calcula para o próximo ano
    if (today.getTime() > birthday.getTime()) {
      birthday.setFullYear(today.getFullYear() + 1); // Próximo ano
    }

    // Calcula a diferença em milissegundos
    const birtd = birthday.getTime() + 1;
    const differenceInMilliseconds = birtd - today.getTime();

    // Converte a diferença para dias
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24),
    );

    // Calcula a idade
    const age = this.calculateAge(new Date(person.birthDate), today);

    if (differenceInDays === 365) {
      return `Hoje é aniversário de ${person.name}, ele tem tem ${age} anos.`;
    } else {
      return `Faltam ${differenceInDays} dias para o aniversário de ${person.name}. Você tem ${age} anos.`;
    }
  }

  private generatePersonMessage(person: People): any {
    const today = new Date();
    const birthday = new Date(person.birthDate);
    let age = this.calculateAge(birthday, today);
    // Define o ano de aniversário para o ano atual
    birthday.setFullYear(today.getFullYear());

    if (
      birthday.getMonth() === today.getMonth() &&
      birthday.getDate() === today.getDate()
    ) {
      return {
        ...person.toJSON(),
        message: `Hoje é aniversário de ${person.name}, ele tem tem ${age} anos.`,
      };
    }

    // Se o aniversário já passou este ano, calcula para o próximo ano
    if (today.getTime() > birthday.getTime()) {
      birthday.setFullYear(today.getFullYear() + 1);
    }

    // Calcula a diferença em dias
    let differenceInDays;
    if (today.getTime() < birthday.getTime()) {
      differenceInDays = Math.ceil(
        (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
    } else {
      birthday.setFullYear(today.getFullYear() + 1);
      differenceInDays = Math.ceil(
        (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
    }

    // Se o aniversário for hoje, ajusta a mensagem para incluir a idade correta
    if (differenceInDays === 0) {
      differenceInDays = 365; // O aniversário é hoje, então a diferença é de um ano
      age++; // Incrementa a idade
    }

    return {
      ...person.toJSON(),
      message: `Faltam ${differenceInDays} dias para o aniversário de ${person.name}. Ele tem ${age} anos.`,
    };
  }

  private calculateAge(birthDate: Date, currentDate: Date): number {
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const ageInMilliseconds = Math.abs(
      currentDate.getTime() - birthDate.getTime(),
    );
    const yearsDiff = Math.floor(
      ageInMilliseconds / (millisecondsInDay * 365.25),
    );
    return yearsDiff;
  }
}
