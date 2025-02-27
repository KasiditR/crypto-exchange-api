import Order from '../models/Order';

export const seedOrder = async () => {
  const orders = [
    {
      user_id: '6240526b98c94663bb866bb4b2bef10d',
      crypto_code: 'BTC',
      currency_code: 'THB',
      order_type: 'buy',
      price: 3000,
    },
    {
      user_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      crypto_code: 'ETH',
      currency_code: 'THB',
      order_type: 'sell',
      price: 3000,
    },
  ];

  try {
    await Order.bulkCreate(orders, {
      updateOnDuplicate: ['crypto_code', 'currency_code', 'order_type', 'price'],
    });

    console.log('Order inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting Order:', error);
  }
};
