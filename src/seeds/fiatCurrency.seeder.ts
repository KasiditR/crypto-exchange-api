import FiatCurrency from './../models/FiatCurrency';

export const seedFiatCurrency = async () => {
  const fiatCurrencies = [
    { currency_code: 'USD', currency_name: 'US Dollar' },
    { currency_code: 'EUR', currency_name: 'Euro' },
    { currency_code: 'THB', currency_name: 'Thai Baht' },
  ];

  try {
    await FiatCurrency.bulkCreate(fiatCurrencies, {
      updateOnDuplicate: ['currency_name'],
    });
    console.log('FiatCurrencies inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting FiatCurrencies:', error);
  }
};
