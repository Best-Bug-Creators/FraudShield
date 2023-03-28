import TransactionService from '../services/transactionService.js';
import HTTPStatus from '../helpers/HTTP.status.js';

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await TransactionService.getById(id);

  return res.status(HTTPStatus.OK).json(response);
}

export const create = async (req, res) => {
  const payload = req.body
  const { id } = req.params;
  const response = await TransactionService.create(payload, id);

  if (response.status === "Approved") return res.status(HTTPStatus.CREATED).json(response);
  if (response.status === "Analysis") return res
    .status(HTTPStatus.SEE_OTHER)
    .set("Location", `transaction/${response.transactionId}`)
    .json(response);
}

export default {
  getById,
  create,
}
