import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { Profile } from './entities/profile.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Profile])],
  exports: [SequelizeModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
