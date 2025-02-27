import { NextFunction, Request, Response } from 'express';
import { ErrorObject } from '../error/ErrorObject';
import Wallet from '../models/Wallet';
import ExchangeRate from '../models/ExchangeRate';
import Crypto from '../models/Crypto';
import Order from '../models/Order';
import FiatCurrency from '../models/FiatCurrency';
import CryptoTransaction from '../models/CryptoTransaction';

const BuyNowCryptoHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fiat_code, crypto_type, crypto_amount } = req.body;
    if (
      !fiat_code ||
      !crypto_type ||
      !crypto_amount ||
      typeof fiat_code !== 'string' ||
      typeof crypto_type !== 'string' ||
      typeof crypto_amount !== 'number' ||
      crypto_amount <= -1.0
    ) {
      throw new ErrorObject('invalid body', 400);
    }

    const exchange = await ExchangeRate.findOne({
      where: { crypto_code: crypto_type.toUpperCase(), currency_code: fiat_code.toUpperCase() },
    });
    if (!exchange) {
      throw new ErrorObject('exchange not found', 400);
    }
    const price = crypto_amount * parseFloat(exchange.rate);

    const [wallet, _] = await Wallet.findOrCreate({
      where: {
        user_id: req.user.user_id,
        crypto_code: exchange.crypto_code,
      },
      defaults: { balance: 0 },
    });
    if (!wallet) {
      throw new ErrorObject();
    }

    await wallet.increment('balance', { by: crypto_amount });
    await wallet.reload();

    await CryptoTransaction.create({
      user_id: req.user.user_id,
      type: 'buy',
      crypto_code: exchange.crypto_code,
      amount: crypto_amount,
      price,
      fiat_code,
      status: 'completed',
    });

    res.status(200).json({
      wallet_id: wallet.wallet_id,
      crypto_code: wallet.crypto_code,
      balance: wallet.balance,
      price,
    });
  } catch (error: any) {
    next(error);
  }
};

const SellNowCryptoHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fiat_code, crypto_type, crypto_amount } = req.body;
    if (
      !fiat_code ||
      !crypto_type ||
      !crypto_amount ||
      typeof fiat_code !== 'string' ||
      typeof crypto_type !== 'string' ||
      typeof crypto_amount !== 'number' ||
      crypto_amount <= -1
    ) {
      throw new ErrorObject('invalid body', 400);
    }

    const exchange = await ExchangeRate.findOne({
      where: { crypto_code: crypto_type.toUpperCase(), currency_code: fiat_code.toUpperCase() },
    });
    if (!exchange) {
      throw new ErrorObject('exchange not found', 400);
    }
    const price = crypto_amount * parseFloat(exchange.rate);

    const wallet = await Wallet.findOne({
      where: {
        user_id: req.user.user_id,
        crypto_code: exchange.crypto_code,
      },
    });

    if (!wallet) {
      throw new ErrorObject('Wallet not found', 400);
    }

    if (parseFloat(wallet.balance) < crypto_amount) {
      throw new ErrorObject(`${crypto_type} not enough`, 400);
    }

    await wallet.decrement('balance', { by: crypto_amount });
    await wallet.reload();

    await CryptoTransaction.create({
      user_id: req.user.user_id,
      type: 'sell',
      crypto_code: exchange.crypto_code,
      amount: crypto_amount,
      price,
      fiat_code,
      status: 'completed',
    });

    res.status(200).json({
      wallet_id: wallet.wallet_id,
      crypto_code: wallet.crypto_code,
      balance: wallet.balance,
      price,
    });
  } catch (error: any) {
    next(error);
  }
};

const SetBuyCryptoHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fiat_code, crypto_type, price } = req.body;
    if (
      !fiat_code ||
      !crypto_type ||
      !price ||
      typeof fiat_code !== 'string' ||
      typeof crypto_type !== 'string' ||
      typeof price !== 'number' ||
      price <= -1
    ) {
      throw new ErrorObject('invalid body', 400);
    }

    const fiat = await FiatCurrency.findByPk(fiat_code.toUpperCase());
    if (!fiat) {
      throw new ErrorObject('fiat not found', 400);
    }

    const crypto = await Crypto.findByPk(crypto_type.toUpperCase());
    if (!crypto) {
      throw new ErrorObject('crypto not found', 400);
    }

    const wallet = await Wallet.findOne({ where: { user_id: req.user.user_id, crypto_code: crypto.crypto_code } });
    if (!wallet) {
      throw new ErrorObject('wallet not found', 400);
    }

    const [order, _] = await Order.upsert({
      user_id: req.user.user_id,
      crypto_code: crypto.crypto_code,
      currency_code: fiat.currency_code,
      order_type: 'buy',
      price: price,
    });
    if (!order) {
      throw new ErrorObject();
    }

    res.status(200).json({
      order_id: order.order_id,
      user_id: order.user_id,
      price: price,
    });
  } catch (error: any) {
    next(error);
  }
};

const SetSellCryptoHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fiat_code, crypto_type, price } = req.body;
    if (
      !fiat_code ||
      !crypto_type ||
      !price ||
      typeof fiat_code !== 'string' ||
      typeof crypto_type !== 'string' ||
      typeof price !== 'number' ||
      price <= -1
    ) {
      throw new ErrorObject('invalid body', 400);
    }

    const fiat = await FiatCurrency.findByPk(fiat_code.toUpperCase());
    if (!fiat) {
      throw new ErrorObject('fiat not found', 400);
    }

    const crypto = await Crypto.findByPk(crypto_type.toUpperCase());
    if (!crypto) {
      throw new ErrorObject('crypto not found', 400);
    }

    const wallet = await Wallet.findOne({ where: { user_id: req.user.user_id, crypto_code: crypto.crypto_code } });
    if (!wallet) {
      throw new ErrorObject('wallet not found', 400);
    }

    const [order, _] = await Order.upsert({
      user_id: req.user.user_id,
      crypto_code: crypto.crypto_code,
      currency_code: fiat.currency_code,
      order_type: 'sell',
      price: price,
    });
    if (!order) {
      throw new ErrorObject();
    }

    res.status(200).json({
      order_id: order.order_id,
      user_id: order.user_id,
      price: price,
    });
  } catch (error: any) {
    next(error);
  }
};

export default {
  BuyNowCryptoHandler,
  SellNowCryptoHandler,
  SetBuyCryptoHandler,
  SetSellCryptoHandler,
};
