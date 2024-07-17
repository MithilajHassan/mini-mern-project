import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


const loginUser = asyncHandler(async (req,res)=>{
    const { email, password } = req.body

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }

})


const signupUser = asyncHandler(async (req,res)=>{
    const { name, email, password } = req.body

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error(`User already exists`)
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


const logoutUser = asyncHandler(async (req, res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),

    })
    res.status(200).json({ message: "User logged out"})
})


const getUserProfile = asyncHandler(async (req, res)=>{
    const { _id, name, email } = req.user
    const user = {
        _id,
        name,
        email
    }

    res.status(200).json(user)
})


const updateUserProfile = asyncHandler(async (req, res)=>{
    const { _id, name, email, image } = req.body
    const user = await User.findById(_id)

    if (user.email !== email) {
        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400)
            throw new Error(`User already exists`)
        }
    }

    if(user){
        user.name = name || user.name
        user.email = email || user.email
        image ? user.profilePic = image : ''
        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


export { loginUser, signupUser, logoutUser, getUserProfile, updateUserProfile }