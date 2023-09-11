const accountIsVerified = async (req, res, next) => {
    if (req.user.verified){
        return next()
    }
    return res.status(400).json({
        success: false,
        message: 'The account is not verified.'
    })
}
export default accountIsVerified