import express from 'express';
import CustomerController from '../controller/customerController.js';

const router = express.Router();

router
  .post('/customers/validateCard', CustomerController.validateCreditCard)
  .get('/customers/:id', CustomerController.getCustomerById);

export default router;
