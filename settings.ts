import { config } from 'dotenv';
import * as process from 'process';
config();

export const settings = {
  JWT_SECRET: process.env.JWT_SECRET || '1234',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '12345',
  TOKEN_LIFE: '1d',

  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: +process.env.POSTGRES_PORT,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
};
