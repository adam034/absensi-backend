import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'profiles',
})
export class Profile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  profile_id: number;

  @Column
  user_id: number;

  @Column
  full_name: string;

  @Column
  phone: string;

  @Column
  address: string;

  @Column
  photo: string;

  @Column
  deletedAt: Date;
}
