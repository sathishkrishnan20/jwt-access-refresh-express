import Joi from "joi";
import { Request, Response, NextFunction  } from 'express'
function JoiValidator(joiSchema: Joi.AnySchema | undefined) {
    return (request: Request, response: Response, next: NextFunction) => {
        if(!joiSchema) {
            next();
            return;
        }
        const requestData = {
            ...request.body,
            ...request.params,
            ...request.query
        }
        const validation = joiSchema.validate(requestData);
        if (validation.error) {
            const errorResponse = {
                success: false,
                statusCode: 400,
                errorStatus: 'Bad Request',
                message: validation.error.details[0].message,
                validationStack: validation  
            }
            return response.status(400).send(errorResponse);
        }
        next();
    }
}
export default JoiValidator;