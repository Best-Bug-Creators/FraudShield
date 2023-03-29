import JOI from "joi";
import customError from "../helpers/CustomError.js";
import HTTPStatus from "../helpers/HTTP.status.js";

const updateStatusValidation = (payload) =>{
    const {error} = JOI.object({
        status: JOI.string().valid('Approved', 'Analysis', 'Rejected').required(),
    }).validate(payload);

    if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
}

export default {
    updateStatusValidation,
};