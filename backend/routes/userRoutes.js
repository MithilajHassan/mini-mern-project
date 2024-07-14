import express from 'express'
import { getUserProfile, loginUser, logoutUser, signupUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/',signupUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logoutUser)
userRouter.route('/profile')
    .get(protect,getUserProfile)
    .put(protect,updateUserProfile)




export default userRouter