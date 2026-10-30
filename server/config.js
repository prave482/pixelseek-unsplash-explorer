import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? undefined : 'server/.env' });

export const config = {
  port: Number(process.env.PORT) || 3000,
  unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
  isProduction: process.env.NODE_ENV === 'production',
};
