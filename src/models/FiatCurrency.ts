import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import ExchangeRate from './ExchangeRate';
import Order from './Order';

@Table({ tableName: 'fiat_currency', timestamps: false, modelName: 'FiatCurrency' })
class FiatCurrency extends Model {
  @Column({ primaryKey: true, type: DataType.STRING(50), allowNull: false })
  currency_code!: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  currency_name!: string;

  @HasMany(() => ExchangeRate)
  exchangeRates!: ExchangeRate[];
  
  @HasMany(() => Order)
  orders!: Order[];

}
export default FiatCurrency;
