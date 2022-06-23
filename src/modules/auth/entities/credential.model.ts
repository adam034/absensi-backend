import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'credentials',
})
export class Credential extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  token_id: number;

  @Column
  user_id: number;

  @Column
  token_value: string;

  @Column
  deletedAt: string;
}
