import Transaction from "../models/Transaction.js";
import validate from "../validations/transaction.js";
import axios from "axios";

const getById = async (id) => {
  const response = await Transaction.findById(id);
  return response;
};

const create = async (payload) => {
  validate.createValidation(payload);
  const client = await axios.get(`http://ms-customer:3002/customers/${payload.clientId}`);
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
    await axios.post("http://ms-anti-fraud:3001/analyses",
      {
        clientId: client._id,
        transactionId: newTransaction._id,
        status: newTransaction.status,
      }
    );
  console.log("cheguei")

    return {
      value: newTransaction.value,
      status: newTransaction.status,
      transactionId: newTransaction._id,
    }  
  }
}; 

const updateStatus = async (id, payload) => {
  validate.updateStatusValidation(payload)
  const transaction = await Transaction.findById(id);

  transaction.status = payload.status

  const response = await Transaction.findByIdAndUpdate(id, transaction, {new: true});
  return response
};

export default {
  getById,
  create,
  updateStatus,
};
