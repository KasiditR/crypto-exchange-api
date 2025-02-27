import CryptoTransaction from './../models/CryptoTransaction';

export const seedCryptoTransaction = async () => {
  const cryptoTransactions = [
    {
      user_id: '6240526b98c94663bb866bb4b2bef10d',
      crypto_code: 'BTC',
      currency_code: 'USD',
      transaction_type: 'buy',
      amount: 0.02,
      price: 870.01,
      status: 'completed',
    },
    {
      user_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      crypto_code: 'BTC',
      currency_code: 'THB',
      transaction_type: 'buy',
      amount: 0.02,
      price: 32000,
      status: 'completed',
    },
    {
      user_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      crypto_code: 'ETH',
      currency_code: 'THB',
      transaction_type: 'buy',
      amount: 123,
      price: 13530000,
      status: 'completed',
    },
  ];

  try {
    await CryptoTransaction.bulkCreate(cryptoTransactions, {
      updateOnDuplicate: ['crypto_code', 'currency_code', 'transaction_type', 'amount', 'price', 'status'],
    });

    console.log('Users inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting Users:', error);
  }
};
