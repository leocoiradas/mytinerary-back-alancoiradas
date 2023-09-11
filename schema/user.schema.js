import Joi from 'joi';

export const registerSchema = Joi.object({
    user: Joi.string()
        .required()
        .min(2)
        .max(30)
        .messages({
            'any.required': '',
            'string.min': 'username should have at least 2 characters.',
            'string.max': 'username should have less than 30 characters.',
            'string.empty': 'user field is empty, please write the username you want to have.'
        })
    ,
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        })
       .messages({
            'any.required': 'The email is required.',
            'string.empty': 'It seems you forgot to write your email, please write it and try again.',
            'string.email': 'Please type a valid email. ex: mail@domail.com'
        }),
    password: Joi.string()
        .required()
        .min(8)
        .max(35)
        .alphanum()
        .messages({
            'any.required': 'Password is required.',
            'string.empty': 'Please type a password for your account.',
            'string.min': 'Password should have at least 8 characters.',
            'string.max': 'Password should have less than 35 characters.',

        }),
    country: Joi.string()
        .required
        .messages({
            'any.required': 'Country is required.'
        }),
    
    image: Joi.string()
        .required()
        .uri()
        .messages({
            'any.required': 'Image is required.',
            'string.uri': 'Image should be a valid URL.'
        })
})

export const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        })
        .messages({
            'any.required': 'The email is required.',
            'string.empty': 'It seems you forgot to write your email, please write it and try again.',
            'string.email': 'Please type a valid email. ex: mail@domail.com'
        }),
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required.',
            'string.empty': 'Please type a password for your account.',
        }),
});