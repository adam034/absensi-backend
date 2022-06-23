import { INTEGER } from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
@Table({
  tableName: 'records',
})
export class Record extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  record_id: number;

  @Column
  user_id: number;

  @Column
  position_in: string;

  @Column
  position_out: string;

  @Column
  date_in: string;

  @Column
  date_out: string;

  @Column
  status_id: number;

  @Column
  description: string;

  @Column
  deletedAt: string;
}
