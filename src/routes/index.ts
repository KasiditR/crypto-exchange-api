import { Router } from 'express';
import authRouter from './auth.routes';
import transactionRouter from './transaction.routes';
import tradeRouter from './trade.routes';

const routes: Router = Router();

routes.use('/auth', authRouter);
routes.use('/trade', tradeRouter);
routes.use('/transaction', transactionRouter);

export const MainRouter: Router = routes;
