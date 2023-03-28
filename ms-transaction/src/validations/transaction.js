import JOI from "joi";
import customError from "../helpers/CustomError.js";
import HTTPStatus from "../helpers/HTTP.status.js";

const createValidation = (payload) => {
    const {error} = JOI.object({
        clientId: JOI.string().required(),
        cardNumber: JOI.string().min(16).max(16).required(),
        value: JOI.number().required(),
        owner: JOI.string().required(),
        cardExpiration: JOI.date().required(),
        cvv: JOI.string().min(3).max(3).required(),
    }).validate(payload);

    if (error) throw customError(HTTPStatus.UN_ENTITY, error.message);
}

const updateStatusValidation = (payload) =>{
    const {error} = JOI.object({
        status: JOI.string().valid('Approved', 'Analysis', 'Rejected').required(),
    }).validate(payload);

    if (error) throw customError(HTTPStatus.UN_ENTITY, error.message);
}

export default {
    createValidation,
    updateStatusValidation,
};