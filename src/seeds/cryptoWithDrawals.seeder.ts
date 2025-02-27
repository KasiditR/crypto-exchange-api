import CryptoWithDrawals from '../models/CryptoWithDrawals';

export const seedCryptoWithDrawals = async () => {
  const cryptoWithDrawals = [
    {
      user_id: '6240526b98c94663bb866bb4b2bef10d',
      crypto_code: 'BTC',
      amount: 0.005,
      destination_address: 'what ever to wallet outside',
      status: 'completed',
    },
    {
      user_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      crypto_code: 'ETH',
      amount: 1.23456,
      destination_address: 'what ever to wallet outside',
      status: 'completed',
    },
  ];
  try {
    await CryptoWithDrawals.bulkCreate(cryptoWithDrawals, {
      updateOnDuplicate: ['crypto_code', 'amount', 'destination_address', 'status'],
    });

    console.log('Users inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting Users:', error);
  }
};
