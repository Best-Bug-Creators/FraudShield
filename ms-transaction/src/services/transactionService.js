import Transaction from "../models/Transaction.js";

const getById = async (id) => {
  const response = await Transaction.findById(id);
  return response;
};

export default {
  getById,
};
