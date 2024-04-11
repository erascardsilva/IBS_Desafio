import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Address } from '../address/address.entity';

@Table
export class People extends Model<People> {
  @Column
  name: string;

  @Column
  sex: string;

  @Column
  birthDate: Date;

  @Column
  maritalStatus: string;

  @HasMany(() => Address)
  addresses: Address[];
}
