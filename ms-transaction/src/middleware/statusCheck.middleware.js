import customError from '../helpers/CustomError.js';
import HTTPStatus from '../helpers/HTTP.status.js';
import Transaction from '../models/Transaction.js';

const statusCheck = async (req, res, next) => {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    throw customError('Transaction does not exist', HTTPStatus.NOT_FOUND);
  }
  if (transaction.status === 'Approved' || transaction.status === 'Rejected') {
    throw customError('Status Approved or Rejected can not be changed', HTTPStatus.BAD_REQUEST);
  }

  next();
};

export default statusCheck;
