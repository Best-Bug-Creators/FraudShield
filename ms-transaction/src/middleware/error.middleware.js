import HTTPStatus from "../helpers/HTTP.status.js";

export default function errorMiddleware(err, req, res, next) {
  if (!err.status) return res.status(HTTPStatus.INTERNAL).json(err);
  return res.status(err.status).json(err);
}
