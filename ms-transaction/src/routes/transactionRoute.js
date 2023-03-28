import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router
  .get('/transactions/:id', transactionController.getById)
  .post('/transactions', transactionController.create)
  .patch('/transactions/:id', transactionController.updateStatus);

export default router;
