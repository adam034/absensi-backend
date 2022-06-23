import { async } from 'rxjs';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
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

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
});
