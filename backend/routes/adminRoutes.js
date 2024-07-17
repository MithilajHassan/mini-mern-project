import express from 'express'
import { adminDashboard, adminLogin } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/', adminLogin)
adminRouter.get('/dashboard', adminDashboard)

export default adminRouter