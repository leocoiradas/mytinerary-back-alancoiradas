import express from 'express'
import controller from '../controllers/auth.controller.js';
import { accountExistsSignUp } from '../middlewares/auth/accountExistsSignUp.middleware.js';
import { accountExistsSignIn } from '../middlewares/auth/accountExistsSignIn.middleware.js';
import { accountIsVerified } from '../middlewares/auth/accountIsVerified.middleware.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.middleware.js';
import { validator } from '../middlewares/validator.js';
import { registerSchema, loginSchema } from '../schema/user.schema.js';
import passport from '../middlewares/passport.js';

const { signup, signin, signout, token } = controller

const router = express.Router()

router.post('/signin', 
    validator(loginSchema),
    accountExistsSignIn,
    accountIsVerified, 
    passwordIsOk,
    signin
)


router.post('/signup',
    validator(registerSchema),
    accountExistsSignUp,
    signup
)

router.post('/signout', passport.authenticate('jwt', {session: false}), signout )

router.post('/token', passport.authenticate('jwt', { session: false }), token)

export default router

