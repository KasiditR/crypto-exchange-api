import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Wallet from './Wallet';
import Order from './Order';
import TradeTransaction from './TradeTransaction';

@Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class User extends Model {
  @Column({ primaryKey: true, type: DataType.STRING(50) })
  user_id!: string;

  @Column({ type: DataType.STRING(250), allowNull: false })
  username!: string;

  @Column({ type: DataType.STRING(250), allowNull: false })
  password!: string;

  @HasMany(() => Wallet)
  wallets!: Wallet[];

  @HasMany(() => Order)
  orders!: Order[];

  @HasMany(() => TradeTransaction)
  transactions!: TradeTransaction[];
}
export default User;
