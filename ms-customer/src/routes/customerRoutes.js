import express from 'express';
import CustomerController from '../controller/customerController.js';

const router = express.Router();

router
  .get('/customer/validateCard', CustomerController.validateCreditCard)
  .get('/customer/:id', CustomerController.getCustomerById);

export default router;
