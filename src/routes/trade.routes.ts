import { Router } from 'express';
import { auth } from '../middleware/jwt.auth';
import tradeController from '../controllers/trade.controller';

const tradeRouter = Router();
tradeRouter.use(auth);
tradeRouter.get('/get-trades', tradeController.GetTradeMarketHandler);
tradeRouter.post('/send', tradeController.SendCryptoHandler);
tradeRouter.post('/send-outside', tradeController.SendOutCryptoHandler);

export default tradeRouter;
