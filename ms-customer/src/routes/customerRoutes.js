import express from 'express';
import CustomerController from '../controller/customerController.js';
import { middlewareLocal, middlewareBearer } from '../authentication/middlewareAuthentication.js';

const router = express.Router();

router
  .get('/customers/invoiceExp/:customerId', middlewareBearer, CustomerController.getCustomerInvoiceExpirationDate)
  .get('/customers/:id', middlewareBearer, CustomerController.getCustomerById)
  .post('/customers/validateCard', middlewareBearer, CustomerController.validateCreditCard)
  .post('/customers/login', middlewareLocal, CustomerController.login);

export default router;
