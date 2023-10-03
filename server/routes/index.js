import { Router } from 'express'
import registerUserController from '../controllers/userController.js'

const router = Router()

router.post('/api/register', registerUserController)

export default router
