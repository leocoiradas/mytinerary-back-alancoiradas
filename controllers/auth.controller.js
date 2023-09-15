import Users from "../models/Users.js";
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const controller = {
    signup: async (req, res, next) => {
        try {
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

            const user = await Users.create(req.body)
            return res.status(201).json({
                success: true,
                message: 'Account created successfully.',
                user
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: 'User could not be registered.'
            })
        }
    },
    signin: async (req, res, next) => {
        try {
            let user = await Users.findOneAndUpdate(
                {email: req.user.email},
                {online: true},
                {new: true}
            )
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    photo: user.photo
                },
                process.env.SECRET,
                {expiresIn: '12h'}
            )
            user.password = null;

            return res.status(200).json({
                success: true,
                message: 'User logged successfully.',
                token,
                user
            })

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: 'Error in autheticate'
            })
        }
    },
    googleSignin: async (req, res, next) => {
        const { token_id } = req.body;
        //req.body.token_id
        try {
            
            const { name, email, photo } = await verify(token_id);

            let user = await Users.findOne({ email });

            
            if (!user) {
                
                const data = {
                    name,
                    email,
                    photo,
                    password: bcryptjs.hashSync(process.env.STANDARD_PASS, 10),
                    google: true,
                    verified_code: crypto.randomBytes(10).toString('hex')
                }

                user = await Users.create(data)
            }

            
            user.online = true;
            await user.save()

            const token = jwt.sign(
                {
                    id: user._id,
                    user: user.name,
                    email: user.email,
                    image: user.photo
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '10h' }
            )

            res.status(200).json({
                success: true,
                message: 'Logged in with Google',
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        photo: user.photo
                    },
                }
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error in authentication'
            })
        }
    },
    signout: async (req, res, next) => {
        try {
            const user = await Users.findOneAndUpdate(
                {email: req.user.email},
                {online: false},
                {new: true}
            )

            return res.status(200).json({
                success: true,
                message: 'User logout',
                user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error in autheticate'
            })
        }
    },
    token: async (req, res, next) => {
        const { user } = req
        try {
            return res.status(200).json({
                user: {
                    name: user.name,
                    email: user.email,
                    photo: user.photo
                },
            })
        } catch (error) {
            next(error)
        }
    }
}

export default controller