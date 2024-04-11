import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { People } from '../people/people.entity';

@Table
export class Address extends Model<Address> {
  @Column
  cep: string;

  @Column
  address: string;

  @Column
  number: string;

  @Column
  complement: string;

  @Column
  district: string;

  @Column
  state: string;

  @Column
  city: string;

  @ForeignKey(() => People)
  @Column
  peopleId: number;
}
