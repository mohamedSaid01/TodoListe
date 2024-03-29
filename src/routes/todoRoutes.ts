import { Router } from "express";
import { createTodo } from "../controllers/todoController"
import Joi from "joi";
import { validateSchema } from "../middlewares/validator";
import {  updateTodo } from "../controllers/todoControllerUpdate";

const router: Router = Router()

const createTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})


router.post('/todos/create', validateSchema(createTodoSchema) ,createTodo) //create


router.patch('/todos/update:id', validateSchema(createTodoSchema), updateTodo)



export default router;