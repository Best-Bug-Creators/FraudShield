import express from 'express';
import CustomerController from '../controller/customerController.js';

const router = express.Router();

router
  .get('/customers/validateCard', CustomerController.validateCreditCard)
  .get('/customers/invoiceExp/:customerId', CustomerController.getCustomerInvoiceExpirationDate)
  .get('/customers/:id', CustomerController.getCustomerById);

export default router;
