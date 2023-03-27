import Customer from '../models/Customer.js';

class CustomerController {
  static getCustomerById = (req, res) => {
    const { id } = req.params;

    Customer.findById(id, (err, customer) => {
      try {
        if (!customer) {
          res.status(404).send({ message: 'Customer not found. ' });
        } else {
          res.status(200).send({
            personalData: customer.personalData,
            address: customer.address,
          });
        }
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });
  };
}

export default CustomerController;
