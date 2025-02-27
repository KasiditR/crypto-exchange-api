import { Model, Sequelize } from 'sequelize-typescript';
import { envVar } from './envVar';
import path from 'path';
import fg from 'fast-glob';
import { seedUser } from '../seeds/user.seeder';
import { seedCrypto } from '../seeds/Crypto.seeder';
import { seedExchangeRate } from '../seeds/exchangeRate.seeder';
import { seedFiatCurrency } from '../seeds/fiatCurrency.seeder';
import { seedOrder } from '../seeds/order.seeder';
import { seedTradeTransaction } from '../seeds/tradeTransaction.seeder';
import { seedWallet } from '../seeds/wallet.seeder';
import { seedCryptoTransaction } from '../seeds/cryptoTransaction.seeder';
import { seedCryptoWithDrawals } from '../seeds/cryptoWithDrawals.seeder';

const sequelize = new Sequelize({
  ...envVar.getDatabaseConnection(),
  dialect: 'mysql',
  models: [],
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
});

export const loadModels = async () => {
  const rootPath = process.cwd();
  const modelFiles = await fg('src/models/**/*.ts', { cwd: rootPath });
  let models = [];

  for (const file of modelFiles) {
    const modelPath = path.join(rootPath, file);
    const importedModule = await import(modelPath);
    const model = importedModule.default || Object.values(importedModule)[0];
    if (model && model.prototype instanceof Model) {
      models.push(model);
    } else {
      console.error(`Invalid model file: ${file}`);
    }
  }

  sequelize.addModels(models);
};

export const seedDatabase = async () => {
  await seedUser();
  await seedCrypto();
  await seedFiatCurrency();
  await seedExchangeRate();
  await seedOrder();
  await seedTradeTransaction();
  await seedWallet();
  await seedCryptoTransaction();
  await seedCryptoWithDrawals();
};

export default sequelize;
