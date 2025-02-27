import Crypto from '../models/Crypto';

export const seedCrypto = async () => {
  const cryptos = [
    { crypto_code: 'BTC', crypto_name: 'Bitcoin' },
    { crypto_code: 'ETH', crypto_name: 'Ethereum' },
    { crypto_code: 'BNB', crypto_name: 'Binance Coin' },
    { crypto_code: 'USDT', crypto_name: 'Tether' },
  ];

  try {
    await Crypto.bulkCreate(cryptos, {
      updateOnDuplicate: ['crypto_name'],
    });
    console.log('Cryptos inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting Cryptos:', error);
  }
};
