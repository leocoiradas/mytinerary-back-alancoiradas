import Users from "../models/Users";
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
    signout: async (req, res, next) => {
        try {
            const user = await Users.findOneAndUpdate(
                {email: req.user.email},
                {online: false},
                {new: true}
            )

            return res.status(200).json({
                success: true,
                message: 'User logout'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error in autheticate'
            })
        }
    }
}

export default controller