import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const adminLogin = asyncHandler(async (req,res)=>{
    const { email, password } = req.body

    const admin = await User.findOne({email})
    if(admin && (await admin.matchPassword(password)) && admin.isAdmin === true){
        generateToken(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            profilePic: admin.profilePic,
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const adminDashboard = asyncHandler(async (req,res)=>{
    res.status(200).send('admin dashboard')
})

export { adminLogin, adminDashboard }