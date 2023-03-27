import express from 'express';
import CustomerController from '../controller/customerController';

const router = express.Router();

router
  .get('/customer/:id', CustomerController.getCustomerById);

export default router;
