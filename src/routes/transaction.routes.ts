import { Router } from 'express';
import transactionController from '../controllers/transaction.controller';
import { auth } from '../middleware/jwt.auth';

const transactionRouter = Router();
transactionRouter.use(auth)
transactionRouter.post('/buy-now', transactionController.BuyNowCryptoHandler);
transactionRouter.post('/sell-now', transactionController.SellNowCryptoHandler);
transactionRouter.post('/set-buy', transactionController.SetBuyCryptoHandler);
transactionRouter.post('/set-sell', transactionController.SetSellCryptoHandler);

export default transactionRouter;
