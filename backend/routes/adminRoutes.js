import express from 'express'
import { adminDashboard, adminLogin, logoutAdmin, manageUserBlock } from '../controllers/adminController.js'
import { adminProtect} from '../middleware/auth.js'

const adminRouter = express.Router()

adminRouter.post('/', adminLogin)
adminRouter.get('/dashboard',adminProtect, adminDashboard)
adminRouter.put('/manageblock',adminProtect,manageUserBlock)
adminRouter.post('/adminlogout',logoutAdmin)

export default adminRouter