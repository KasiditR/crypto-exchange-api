import TradeTransaction from '../models/TradeTransaction';

export const seedTradeTransaction = async () => {
  const tradeTransactions = [
    {
      sender_id: '6240526b98c94663bb866bb4b2bef10d',
      receive_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      crypto_code: 'ETH',
      amount: 1,
    },
    {
      sender_id: '6240526b98c94663bb866bb4b2bef10d',
      receive_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      crypto_code: 'BTC',
      amount: 2,
    },
    {
      sender_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      receive_id: '6240526b98c94663bb866bb4b2bef10d',
      crypto_code: 'BTC',
      amount: 50,
    },
    {
      sender_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      receive_id: '6240526b98c94663bb866bb4b2bef10d',
      crypto_code: 'ETH',
      amount: 0.0005,
    },
  ];

  try {
    await TradeTransaction.bulkCreate(tradeTransactions, {
      updateOnDuplicate: ['sender_id', 'receive_id', 'crypto_code', 'amount'],
    });
    console.log('FiatCurrencies inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting FiatCurrencies:', error);
  }
};
