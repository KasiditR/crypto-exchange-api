import ExchangeRate from '../models/ExchangeRate';

export const seedExchangeRate = async () => {
  const exchangeRates = [
    { crypto_code: 'BTC', currency_code: 'USD', rate: 43500.5 },
    { crypto_code: 'BTC', currency_code: 'EUR', rate: 40000.75 },
    { crypto_code: 'BTC', currency_code: 'THB', rate: 1600000.0 },

    { crypto_code: 'ETH', currency_code: 'USD', rate: 3000.25 },
    { crypto_code: 'ETH', currency_code: 'EUR', rate: 2750.8 },
    { crypto_code: 'ETH', currency_code: 'THB', rate: 110000.0 },

    { crypto_code: 'BNB', currency_code: 'USD', rate: 350.1 },
    { crypto_code: 'BNB', currency_code: 'EUR', rate: 320.5 },
    { crypto_code: 'BNB', currency_code: 'THB', rate: 12500.0 },

    { crypto_code: 'USDT', currency_code: 'USD', rate: 1.0 },
    { crypto_code: 'USDT', currency_code: 'EUR', rate: 0.95 },
    { crypto_code: 'USDT', currency_code: 'THB', rate: 36.2 },
  ];

  try {
    await ExchangeRate.bulkCreate(exchangeRates, {
      updateOnDuplicate: ['currency_code', 'rate'],
    });
    console.log('ExchangeRates inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting ExchangeRates:', error);
  }
};
