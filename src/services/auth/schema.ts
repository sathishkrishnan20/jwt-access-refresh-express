import Joi from 'joi';

const UserSignIn: Joi.AnySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const UserSignUp: Joi.AnySchema = Joi.object({
    userName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().required()
});

const GenerateAccessToken: Joi.AnySchema = Joi.object({
    userId: Joi.string().required(),
    refreshToken: Joi.string().required()
});

export {
    UserSignIn,
    UserSignUp,
    GenerateAccessToken
}

