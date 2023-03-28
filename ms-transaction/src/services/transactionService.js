import Transaction from "../models/Transaction";

export const getById = async (id) => {
  const response = await Transaction.findById(id);
  return response;
};
