import { Table, Column, ForeignKey, Model, DataType, BelongsTo, AfterFind } from 'sequelize-typescript';
import User from './User';
import Crypto from './Crypto';

@Table({
  tableName: 'wallets',
  modelName: 'Wallet',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'crypto_code'],
    },
  ],
})
class Wallet extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  wallet_id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(50), allowNull: false })
  user_id!: string;

  @ForeignKey(() => Crypto)
  @Column({ type: DataType.STRING(50), allowNull: false })
  crypto_code!: string;

  @Column({ type: DataType.DECIMAL(18, 8), allowNull: false })
  balance!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Crypto)
  crypto!: Crypto;

  @AfterFind
  static convertBalanceToFloat(instances: Wallet | Wallet[]) {
    if (Array.isArray(instances)) {
      instances.forEach((wallet) => {
        wallet.balance = parseFloat(wallet.balance as unknown as string) as any;
      });
    } else if (instances) {
      instances.balance = parseFloat(instances.balance as unknown as string) as any;
    }
  }
}
export default Wallet;
