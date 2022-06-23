import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.model';
import { Profile } from '../users/entities/profile.model';
import { Credential } from './entities/credential.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Profile, Credential])],
  exports: [SequelizeModule, AuthService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
