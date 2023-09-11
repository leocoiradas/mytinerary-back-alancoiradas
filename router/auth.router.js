import express from 'express'
import controller from '../controllers/auth.controller.js';
import { accountExistsSignUp } from '../middlewares/auth/accountExistsSignUp.middleware.js';
import { accountExistSignIn } from '../middlewares/auth/accountExistsSignIn.middleware.js';
import { accountIsVerified } from '../middlewares/auth/accountIsVerified.middleware.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js';
import { validator } from '../middlewares/validator.js';
import { registerSchema, loginSchema } from '../schema/user.schema.js';

const { signup, signin } = controller

const router = express.Router()

router.post('/signin', 
    validator(loginSchema),
    accountExistSignIn,
    accountIsVerified, 
    passwordIsOk,
    signin
)


router.post('/signup',
    validator(registerSchema),
    accountExistsSignUp,
    signup
)

export default router

