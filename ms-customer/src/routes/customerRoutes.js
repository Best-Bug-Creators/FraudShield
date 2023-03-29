import express from 'express';
import CustomerController from '../controller/customerController.js';
import middlewareLocal from '../authentication/middlewareAuthentication.js';

const router = express.Router();

router
  .get('/customers/invoiceExp/:customerId', CustomerController.getCustomerInvoiceExpirationDate)
  .get('/customers/:id', CustomerController.getCustomerById)
  .post('/customers/validateCard', CustomerController.validateCreditCard)
  .post('/customers/login', middlewareLocal, CustomerController.login);

export default router;
