import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
    let error = err;

    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        error = new ApiError(statusCode, message, error?.errors || [], error.stack);
    }

    if (error.statusCode === 500) {
        logger.error(`[500] Internal Server Error: ${error.message}`, { stack: error.stack });
    } else {
        logger.warn(`[${error.statusCode}] API Error: ${error.message}`);
    }

    const response = {
        success: error.success,
        message: error.message,
        errors: error.errors,
        ...(process.env.NODE_ENV === "development" ? {stack: error.stack} : {})

    }

    return res.status(error.statusCode || 500).json(response);
}