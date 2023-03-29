import Transaction from "../models/Transaction.js";
import validate from "../validations/transaction.js";
import axios from "axios";

const getById = async (id) => {
  const response = await Transaction.findById(id);
  return response;
};

const create = async (payload) => {
  const { value:_, ...payloadWithoutValue } = payload;
  const validateCreditCardData = await axios.post("http://ms-customer:3002/customers/validateCard", payloadWithoutValue);

  const resultOfCreditCardValidation = validateCreditCardData.data;
  const response = await axios.get(`http://ms-customer:3002/customers/${resultOfCreditCardValidation._id}`);

  const client = response.data;
  const transactionInstance = {
    value: payload.value,
    clientId: client._id,
  }

  const halfMontlhyIncome = Number(client.personalData.monthlyIncome.$numberDecimal) / 2;

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
    console.log("CHEGUEI RECUSADO");
    await axios.post("http://ms-anti-fraud:3001/analyses",
      {
        clientId: client._id,
        transactionId: newTransaction._id,
        status: newTransaction.status,
      }
    );

    console.log("CHEGUEI RECUSADO");
  

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
