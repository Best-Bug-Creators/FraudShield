import Customer from '../models/Customer.js';

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
    console.log(cardData)
    try {
      const customerId = await Customer.findOne({ cardData }, { _id: 1 });

      if (!customerId) return res.status(400).send('Credentials don\'t match');
      return res.status(200).send(customerId);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };
}

export default CustomerController;
