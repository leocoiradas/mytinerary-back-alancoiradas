import Users from "../models/Users.js";

const usersController ={
    getUsers: async(req, res) => {
        try {
            const users = await Users.find();
            return res.status(200).json({
                success: true,
                users
            })
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                success: false,
                message: "No users found"
            })
        }
    },
    getUserById: async(req, res) => {
        try {
            const userId = req.params.id
            const userById = await Users.findById(userId)
            return res.status(200).json({
                success: true,
                message: "user found by id",
                userById
            })
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                success: false,
                message: "No user found with the provided id"
            })
        }
    },
    createUser: async(req, res) => {
        try {
            const newUser = await Users.create(req.body)
            return res.status(200).json({
                success: true,
                message: "User succesfully created",
                newUser
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "There was an error while creating the user"
            })
        }
    },
    updateUser: async(req, res) => {
        try {
            const userId = req.params.id
            const updatedUser = Users.findByIdAndUpdate(userId, req.body, {new: true})
            return res.status(201).json({
                success: true,
                message: "User updated correctly",
                updatedUser
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "The user could not be updated"
            })
        }
    },
    deleteUser: async(req, res) => {
        try {
            const userId = req.params.id
            const deletedUser = await Users.findByIdAndDelete(userId)
            if(!deletedUser){
                return res.status(404).json({
                    success: false,
                    message: "The id provided does not match with any user and could not be deleted"
                })
            }
            return res.status(200).json({
                success: true,
                message: "User deleted"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: true,
                message: "There was an error and the user could not be deleted"
            })
        }
    }
};

export default usersController