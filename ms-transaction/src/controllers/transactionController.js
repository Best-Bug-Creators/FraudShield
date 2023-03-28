import TransactionService from '../services/transactionService.js';
import HTTPStatus from '../helpers/HTTP.status.js';

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await TransactionService.getById(id);

  return res.status(HTTPStatus.OK).json(response);
}

export default {
  getById,
}
