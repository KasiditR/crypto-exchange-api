import { NextFunction, Request, Response } from 'express';
import { ErrorObject } from '../error/ErrorObject';
import FiatCurrency from '../models/FiatCurrency';
import Crypto from '../models/Crypto';
import Order from '../models/Order';
import User from '../models/User';
import Wallet from '../models/Wallet';
import sequelize from '../configs/database';
import TradeTransaction from '../models/TradeTransaction';
import CryptoWithDrawals from '../models/CryptoWithDrawals';

const GetTradeMarketHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fiat_code, provider, crypto_type } = req.query;

    if (!fiat_code || !provider || !crypto_type || typeof fiat_code !== 'string' || typeof crypto_type !== 'string') {
      throw new ErrorObject('Invalid query', 400);
    }

    if (typeof provider !== 'string' || (provider !== 'buy' && provider !== 'sell')) {
      throw new ErrorObject('Invalid query', 400);
    }

    const fiat = await FiatCurrency.findByPk(fiat_code.toUpperCase());
    if (!fiat) {
      throw new ErrorObject('fiat not found', 400);
    }

    const crypto = await Crypto.findByPk(crypto_type.toUpperCase());
    if (!crypto) {
      throw new ErrorObject('crypto not found', 400);
    }

    const orders = await Order.findAll({
      where: {
        order_type: provider,
        crypto_code: crypto.crypto_code,
        currency_code: fiat.currency_code,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!orders) {
      throw new ErrorObject();
    }
    res.status(200).json({ orders });
  } catch (error: any) {
    next(error);
  }
};

const SendCryptoHandler = async (req: Request, res: Response, next: NextFunction) => {
  const t = await sequelize.transaction();
  try {
    const { user_id, crypto_type, amount } = req.body;
    if (
      !user_id ||
      !crypto_type ||
      !amount ||
      typeof user_id !== 'string' ||
      typeof crypto_type !== 'string' ||
      typeof amount !== 'number' ||
      amount <= -1
    ) {
      throw new ErrorObject('invalid body', 400);
    }

    const crypto = await Crypto.findByPk(crypto_type.toUpperCase());
    if (!crypto) {
      throw new ErrorObject('crypto not found', 400);
    }

    const userReceive = await User.findByPk(user_id, { transaction: t });
    if (!userReceive) {
      throw new ErrorObject('user not found', 400);
    }

    const ownUserId = req.user.user_id;
    const ownWallet = await Wallet.findOne({
      where: {
        user_id: ownUserId,
        crypto_code: crypto.crypto_code,
      },
      transaction: t,
    });
    if (!ownWallet) {
      throw new ErrorObject('wallet not found', 400);
    }

    const [receiveWallet, _] = await Wallet.findOrCreate({
      where: {
        user_id: user_id,
        crypto_code: crypto.crypto_code,
      },
      defaults: { balance: 0 },
      transaction: t,
    });
    if (!receiveWallet) {
      throw new ErrorObject();
    }

    const balance = parseFloat(ownWallet.balance);
    if (balance < amount) {
      throw new ErrorObject('balance not enough', 400);
    }

    await ownWallet.decrement('balance', { by: amount });
    await receiveWallet.increment('balance', { by: amount });
    await ownWallet.reload();

    const transaction = await TradeTransaction.create({
      sender_id: ownUserId,
      receive_id: user_id,
      crypto_code: crypto.crypto_code,
      amount: amount,
      status: 'completed', // for example
    });
    await transaction.save();

    await t.commit();

    res.status(200).json({
      message: `Send ${crypto.crypto_code} success`,
      crypto: ownWallet.crypto_code,
      balance: ownWallet.balance,
    });
  } catch (error: any) {
    await t.rollback();
    next(error);
  }
};

const SendOutCryptoHandler = async (req: Request, res: Response, next: NextFunction) => {
  const t = await sequelize.transaction();
  try {
    const { address, crypto_type, amount } = req.body;
    if (
      !address ||
      !crypto_type ||
      !amount ||
      typeof address !== 'string' ||
      typeof crypto_type !== 'string' ||
      typeof amount !== 'number' ||
      amount <= -1
    ) {
      throw new ErrorObject('invalid body', 400);
    }

    const crypto = await Crypto.findByPk(crypto_type.toUpperCase());
    if (!crypto) {
      throw new ErrorObject('crypto not found', 400);
    }
    const wallet = await Wallet.findOne({ where: { user_id: req.user.user_id, crypto_code: crypto.crypto_code } });
    if (!wallet) {
      throw new ErrorObject('wallet not found', 400);
    }

    const balance = parseFloat(wallet.balance);
    if (balance < amount) {
      throw new ErrorObject('balance not enough', 400);
    }

    await wallet.decrement('balance', { by: amount });
    await wallet.reload();

    const cryptoWithDrawals = await CryptoWithDrawals.create({
      user_id: req.user.user_id,
      crypto_code: crypto.crypto_code,
      amount: amount,
      destination_address: address,
      status: 'completed', // for example
    });

    await cryptoWithDrawals.save();

    await t.commit();

    res.status(200).json({
      message: `Send ${crypto.crypto_code} success`,
      crypto: wallet.crypto_code,
      balance: wallet.balance,
    });
  } catch (error: any) {
    await t.rollback();
    next(error);
  }
};

export default {
  GetTradeMarketHandler,
  SendCryptoHandler,
  SendOutCryptoHandler,
};
