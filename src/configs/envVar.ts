import dotenv from 'dotenv';

dotenv.config();

export const envVar = {
  port: process.env.PORT || 3000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '123456',
  getDatabaseConnection: () => ({
    database: process.env.DB_NAME || 'vr_test',
    username: process.env.DB_USERNAME || 'vr_test',
    password: process.env.DB_PASSWORD || '123456',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
  }),
};
