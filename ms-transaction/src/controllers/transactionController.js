import TransactionService from '../services/transactionService';

export const getById = async (req, res) => {
  const { id } = req.params;
  const response = await TransactionService.getById(id);

  return res.status().json();
}
