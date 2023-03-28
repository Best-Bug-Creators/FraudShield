import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router
  .get('/transaction/:id', transactionController.getById)
  .post('/transaction/:id', transactionController.create)
  .patch('/transaction/:id', transactionController.updateStatus);

export default router;
