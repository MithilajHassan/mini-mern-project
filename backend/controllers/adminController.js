import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const adminLogin = asyncHandler(async (req,res)=>{
    const { email, password } = req.body

    const admin = await User.findOne({email})
    if(admin && (await admin.matchPassword(password)) && admin.isAdmin === true){
        generateToken(res, admin._id,admin.isAdmin)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const adminDashboard = asyncHandler(async (req,res)=>{
    const users = await User.find({isAdmin:false})
    res.status(200).json({users})
})

const manageUserBlock = asyncHandler(async (req,res)=>{
    const { _id, status } = req.body
    if(!_id && !status){
        throw new Error('Data Missing')
    }
    const updated = await User.updateOne({_id:_id},{$set:{isBlock:status}})
    if(updated){
       res.status(200).json({success:true}) 
    }
    throw new Error('User not found')
})

const logoutAdmin = asyncHandler(async (req, res)=>{
    res.cookie('jwtAdmin','',{
        httpOnly:true,
        expires: new Date(0),
    })
    res.status(200).json({ message: "Admin logged out"})
})

export { adminLogin, adminDashboard, manageUserBlock, logoutAdmin }