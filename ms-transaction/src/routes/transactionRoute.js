import express from 'express';
import transactionController from '../controllers/transactionController.js';
import statusCheck from '../middleware/statusCheck.middleware.js';
import { middlewareBearer } from '../authentication/middlewareAuthentication.js';

const router = express.Router();

router
  .get('/transactions/:id', middlewareBearer, transactionController.getById)
  .post('/transactions', middlewareBearer, transactionController.create)
  .patch('/transactions/:id', middlewareBearer, statusCheck, transactionController.updateStatus);

export default router;
