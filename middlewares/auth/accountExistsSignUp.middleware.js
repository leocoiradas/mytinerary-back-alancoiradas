import Users from "../../models/Users.js";

export const accountExistsSignUp = async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email })
    if (user){
        return res.status(400).json({
            success: false,
            message: 'The email already has an account.'
        })
    }
    return next()
}

export default accountExistsSignUp