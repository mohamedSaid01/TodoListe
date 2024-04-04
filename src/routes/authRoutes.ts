import { loginUser, registreUser } from "../controllers/userController"
import { Router } from "express";

const router : Router = Router()
router.post('/registre', registreUser)
router.post('/login', loginUser)

export default router;