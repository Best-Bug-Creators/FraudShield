import JOI from "joi";
import customError from "../helpers/CustomError";
import HTTPStatus from "../helpers/HTTP.status";

const createValidation = (payload) => {
    const {error} = JOI.object({
        cardNumber: JOI.string().min(16).max(16).required(),
        value: JOI.number().required(),
        owner: JOI.string().required(),
        cardExpiration: JOI.date().required(),
        cvv: JOI.string().min(3).max(3).required(),
    }).validate(payload);

    if (error) throw customError(HTTPStatus.UN_ENTITY, error.message);
}

export default createValidation;