import User from '../models/User';

export const seedUser = async () => {
  const users = [
    {
      user_id: '6240526b98c94663bb866bb4b2bef10d',
      username: 'john',
      password: '$2b$10$/MqJA8jBzLPy.WjiPhGwReUlkzQc85AFL8y5Y7ECABhnJo0/dUl5S', //123456
    },
    {
      user_id: '6f6ac3be0b2b49eaa4f7051aebbfbc04',
      username: 'Max Verstappen',
      password: '$2b$10$uB4eAyf8HnI2OYr0y.d3muf8u1nI2Wou/7CFHZwNjcViyavzOnUBa', //654321
    },
  ];

  try {
    await User.bulkCreate(users, {
      updateOnDuplicate: ['username', 'password'],
    });

    console.log('Users inserted or updated successfully!');
  } catch (error) {
    console.error('Error inserting Users:', error);
  }
};
