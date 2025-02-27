import { Table, Column, ForeignKey, Model, DataType, BelongsTo } from 'sequelize-typescript';
import User from './User';
import Crypto from './Crypto';

@Table({
  tableName: 'trade_transactions',
  modelName: 'TradeTransaction',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class TradeTransaction extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  transaction_id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(50), allowNull: false })
  sender_id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(50), allowNull: false })
  receive_id!: string;

  @ForeignKey(() => Crypto)
  @Column({ type: DataType.STRING(250), allowNull: false })
  crypto_code!: string;

  @Column({ type: DataType.DECIMAL(18, 8), allowNull: false })
  amount!: string;

  @Column({ type: DataType.ENUM('pending', 'completed', 'failed'), allowNull: false })
  status!: 'pending' | 'completed' | 'failed';

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Crypto)
  crypto!: Crypto;
}
export default TradeTransaction;
