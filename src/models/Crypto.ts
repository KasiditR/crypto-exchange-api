import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import ExchangeRate from './ExchangeRate';
import Wallet from './Wallet';
import Order from './Order';

@Table({ tableName: 'crypto', timestamps: false, modelName: 'Crypto' })
class Crypto extends Model {
  @Column({ primaryKey: true, type: DataType.STRING(50), allowNull: false })
  crypto_code!: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  crypto_name!: string;

  @HasMany(() => ExchangeRate)
  exchangeRates!: ExchangeRate[];

  @HasMany(() => Wallet)
  wallets!: Wallet[];

  @HasMany(() => Order)
  orders!: Order[];
}

export default Crypto;
