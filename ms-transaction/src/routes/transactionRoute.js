import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router
  .get('/transaction/:id', transactionController.getById);

export default router;
