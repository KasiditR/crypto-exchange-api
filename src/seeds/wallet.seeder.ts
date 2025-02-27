import Wallet from '../models/Wallet';

export const seedWallet = async () => {
  const wallets = [
    {
      user_id: '6240526b98c94663bb866bb4b2bef10d',
      crypto_code: 'BTC',
      balance: 123,
    },
    {
      user_id: '6240526b98c94663bb866bb4b2bef10d',
      crypto_code: 'ETH',
      balance: 321,
    },
    {
      user_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      crypto_code: 'BTC',
      balance: 456,
    },
    {
      user_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      crypto_code: 'ETH',
      balance: 1150,
    },
  ];

  try {
    await Wallet.bulkCreate(wallets, {
      updateOnDuplicate: ['user_id', 'crypto_code', 'balance'],
    });
    console.log('Wallet inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting Wallet:', error);
  }
};
