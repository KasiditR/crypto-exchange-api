import { Table, Column, ForeignKey, Model, DataType, BelongsTo } from 'sequelize-typescript';
import User from './User';
import Crypto from './Crypto';
import FiatCurrency from './FiatCurrency';

@Table({
  tableName: 'crypto_transactions',
  modelName: 'CryptoTransaction',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class CryptoTransaction extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  crypto_transaction_id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(50), allowNull: false })
  user_id!: string;

  @ForeignKey(() => Crypto)
  @Column({ type: DataType.STRING(50), allowNull: false })
  crypto_code!: string;

  @ForeignKey(() => FiatCurrency)
  @Column({ type: DataType.STRING(50), allowNull: false })
  currency_code!: string;

  @Column({ type: DataType.ENUM('buy', 'sell'), allowNull: false })
  transaction_type!: 'buy' | 'sell';

  @Column({ type: DataType.DECIMAL(18, 8), allowNull: false })
  amount!: string;

  @Column({ type: DataType.DECIMAL(18, 8), allowNull: false })
  price!: string;

  @Column({ type: DataType.ENUM('pending', 'completed', 'failed'), allowNull: false })
  status!: 'pending' | 'completed' | 'failed';

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Crypto)
  crypto!: Crypto;

  @BelongsTo(() => FiatCurrency)
  fiatCurrency!: FiatCurrency;
}

export default CryptoTransaction;
