import Joi from 'joi';

export const createUserSchema = Joi.object({
    user: Joi.string()
        .required()
        .min(2)
        .max(30)
    ,
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        })
       /* .messages({
            'any.required': 'The email is required'
        }),*/,
    password: Joi.string()
        .required()
        .min(8)
        .max(35)
        .alphanum(),
    
    image: Joi.string()
        .required()
        .uri()
})