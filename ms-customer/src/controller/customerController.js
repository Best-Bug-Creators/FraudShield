import bcrypt from 'bcryptjs';
import Customer from '../models/Customer.js';
import User from '../models/User.js';
import createTokenJWT from '../authentication/generateToken.js';

class CustomerController {
  static getCustomerById = async (req, res) => {
    const { id } = req.params;

    try {
      const customer = await Customer.findById(id);
      if (!customer) {
        res.status(404).send({ message: 'Customer not found.' });
      } else {
        res.status(200).send({
          personalData: customer.personalData,
          address: customer.address,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static validateCreditCard = async (req, res) => {
    const cardData = req.body;

    try {
      const customerId = await Customer.findOne({ cardData }, { _id: 1 });

      if (!customerId) return res.status(400).send('Credentials don\'t match');
      return res.status(200).send(customerId);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };

  static getCustomerInvoiceExpirationDate = async (req, res) => {
    const { customerId } = req.params;

    try {
      const customer = await Customer.findById(customerId);

      if (!customer) return res.status(404).send({ message: 'Customer not found.' });
      return res.status(200).send({
        name: customer.personalData.name,
        phone: customer.personalData.phone,
        monthlyIncome: customer.personalData.monthlyIncome,
        invoiceExpirationDate: customer.cardData.invoiceExpirationDate,
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };

  static hashPassword(password) {
    const salt = 12;
    return bcrypt.hash(password, salt);
  }

  static login = (req, res) => {
    const token = createTokenJWT(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  };

  static async findByUsername(username) {
    const user = await User.findOne({ username });

    return user;
  }
}

export default CustomerController;
