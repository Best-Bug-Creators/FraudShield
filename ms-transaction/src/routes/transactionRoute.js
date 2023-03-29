import express from 'express';
import transactionController from '../controllers/transactionController.js';
import statusCheck from '../middleware/statusCheck.middleware.js';

const router = express.Router();

router
  .get('/transactions/:id', transactionController.getById)
  .post('/transactions', transactionController.create)
  .patch('/transactions/:id', statusCheck, transactionController.updateStatus);

export default router;
