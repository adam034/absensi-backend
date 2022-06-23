import {
  AutoIncrement,
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Profile } from './profile.model';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_id: number;

  @Column
  nip: string;

  @Column
  password: string;

  @Column
  role_id: number;

  @Column
  status_id: number;

  @Column
  agency_id: number;

  @Column
  is_active: boolean;

  @Column
  deletedAt: string;

  @HasOne(() => Profile, 'user_id')
  profile: Profile;
}
