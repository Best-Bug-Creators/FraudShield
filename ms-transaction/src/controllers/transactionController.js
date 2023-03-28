import TransactionService from '../services/transactionService';
import HTTPStatus from '../helpers/HTTP.status';

export const getById = async (req, res) => {
  const { id } = req.params;
  const response = await TransactionService.getById(id);

  return res.status(HTTPStatus.OK).json(response);
}
