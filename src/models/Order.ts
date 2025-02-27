import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AfterFind } from 'sequelize-typescript';
import User from './User';
import Crypto from './Crypto';
import FiatCurrency from './FiatCurrency';

@Table({
  tableName: 'orders',
  modelName: 'Order',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class Order extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  order_id!: number;

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
  order_type!: 'buy' | 'sell';

  @Column({ type: DataType.DECIMAL(18, 8), allowNull: false })
  price!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Crypto)
  crypto!: Crypto;

  @BelongsTo(() => FiatCurrency)
  fiatCurrency!: FiatCurrency;

  @AfterFind
  static convertBalanceToFloat(instances: Order | Order[]) {
    if (Array.isArray(instances)) {
      instances.forEach((order) => {
        order.price = parseFloat(order.price as unknown as string) as any;
      });
    } else if (instances) {
      instances.price = parseFloat(instances.price as unknown as string) as any;
    }
  }
}
export default Order;
