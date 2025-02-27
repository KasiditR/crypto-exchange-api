import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Crypto from './Crypto';
import FiatCurrency from './FiatCurrency';

@Table({
  tableName: 'exchange_rate',
  timestamps: false,
  modelName: 'ExchangeRate',
  indexes: [
    {
      unique: true,
      fields: ['crypto_code', 'currency_code'],
    },
  ],
})
class ExchangeRate extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  exchange_id!: string;

  @ForeignKey(() => Crypto)
  @Column({ type: DataType.STRING(50), allowNull: false })
  crypto_code!: string;

  @ForeignKey(() => FiatCurrency)
  @Column({ type: DataType.STRING(50), allowNull: false })
  currency_code!: string;

  @Column({ type: DataType.DECIMAL(18, 8), allowNull: false })
  rate!: string;

  @BelongsTo(() => Crypto)
  crypto!: Crypto;

  @BelongsTo(() => FiatCurrency)
  fiatCurrency!: FiatCurrency;
}

export default ExchangeRate;
