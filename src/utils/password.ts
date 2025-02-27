import { compare, hash } from 'bcryptjs';

const saltRounds = 10;

export const HashPassword = async (password: string) => {
  return await hash(password, saltRounds);
};

export const VerifyPassword = async (enteredPassword: string, storedHash: string) => {
  return await compare(enteredPassword, storedHash);
};
