import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import * as dotenv from 'dotenv';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './modules/users/entities/profile.model';
import { User } from './modules/users/entities/user.model';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Credential } from './modules/auth/entities/credential.model';
import { RecordsModule } from './modules/records/records.module';
import { Record } from './modules/records/entities/record.model';
import { StatusesModule } from './modules/statuses/statuses.module';

dotenv.config();
const node = process.env.STATE;
const host =
  node === 'staging' ? process.env.PG_STAGING_HOST : process.env.PG_PROD_HOST;
const username =
  node === 'staging'
    ? process.env.PG_STAGING_USERNAME
    : process.env.PG_PROD_USERNAME;
const password =
  node === 'staging'
    ? process.env.PG_STAGING_PASSWORD
    : process.env.PG_PROD_PASSWORD;
const port =
  node === 'staging'
    ? parseInt(process.env.PG_STAGING_PORT)
    : parseInt(process.env.PG_PROD_PORT);
const database =
  node === 'staging'
    ? process.env.PG_STAGING_DATABASE
    : process.env.PG_STAGING_DATABASE;
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      models: [User, Profile, Credential, Record],
    }),
    UsersModule,
    AuthModule,
    RecordsModule,
    StatusesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: `${process.env.BASE_PATH}/auth/login`,
        method: RequestMethod.POST,
      })
      .forRoutes({
        path: `/**`,
        method: RequestMethod.ALL,
      });
  }
}
