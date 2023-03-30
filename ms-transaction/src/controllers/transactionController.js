import TransactionService from '../services/transactionService.js';
import HTTPStatus from '../helpers/HTTP.status.js';

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await TransactionService.getById(id);

  return res.status(HTTPStatus.OK).json(response);
};

const create = async (req, res) => {
  const payload = req.body;
  const { authorization } = req.headers;
  const response = await TransactionService.create(payload, authorization);

  if (response.status === 'Approved') return res.status(HTTPStatus.CREATED).json(response);
  return res
    .status(HTTPStatus.SEE_OTHER)
    .set('Location', `http://127.0.0.1:3003/transactions/${response.transactionId}`)
    .end();
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const response = await TransactionService.updateStatus(id, payload);
  return res.status(HTTPStatus.OK).json(response);
};

export default {
  getById,
  create,
  updateStatus,
};
