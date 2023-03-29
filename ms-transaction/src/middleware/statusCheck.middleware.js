import customError from "../helpers/CustomError";
import HTTPStatus from "../helpers/HTTP.status";

const statusCheck = (req, res, next) => {
  const { status } = req.body;

  if (status === 'Approved' || status === 'Reproved') {
    throw customError('Status Approved or Rejected can not be changed', HTTPStatus.BAD_REQUEST);
  }

  next();
}

export default statusCheck;
