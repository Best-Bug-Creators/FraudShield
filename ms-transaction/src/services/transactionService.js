import Transaction from "../models/Transaction.js";
import createValidation from "../validations/transaction.js"
import axios from axios;

const getById = async (id) => {
  const response = await Transaction.findById(id);
  return response;
};

const create = async (payload, clientId) => {
  createValidation(payload);
  const client = await axios.get(`localhost:3002/customer/${clientId}`);
  const transactionInstance = {
    value: payload.value,
    clientId: client._id,
  }
  
  const halfMontlhyIncome = client.monthlyIncome / 2;

  if (halfMontlhyIncome > payload.value) {
    transactionInstance.status = "Approved";
    const newTransaction = await Transaction.create(transactionInstance)

    return {
      value: newTransaction.value,
      status: newTransaction.status
    }

  } else {
    transactionInstance.status = "Analysis";
    const newTransaction = await Transaction.create(transactionInstance)
    const antiFraud = await axios.post("localhost:3001/analysis",
    { 
      clientId: client._id,
      transactionId: newTransaction._id,
      status: newTransaction.status,
    });

    return {
      value: newTransaction.value,
      status: newTransaction.status,
      transactionId: newTransaction._id,
    }  
  }
}; 

export default {
  getById,
  create,
};
