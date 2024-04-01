import { Router } from "express";
import { createTodo,  deleteTodoById,  findAllTodo,  findAllTodoPaginate,  getOneTodoById, updateOneTodoById} from "../controllers/todoController"
import Joi from "joi";
import { validateSchema } from "../middlewares/validator";


const router: Router = Router()

const createTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})

const updateTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})



// router.put('/todos/update:id', validateSchema(createTodoSchema, 'params'), updateTodo)


const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).message("invalid todo id")
const getOneTodoByIdSchema = Joi.object({ id: idSchema})

router.post('/todos', validateSchema(createTodoSchema, 'body') ,createTodo) //create
router.get('/todos/:id', validateSchema(getOneTodoByIdSchema, 'params')  ,getOneTodoById)
router.put('/todos/:id', validateSchema(getOneTodoByIdSchema,'params'),
          validateSchema(updateTodoSchema,'body'), updateOneTodoById)
router.delete('/todos/:id',validateSchema(getOneTodoByIdSchema,'params'), deleteTodoById)  


router.get('/todosAll', findAllTodo);
router.get('/todosAllPaginate', findAllTodoPaginate);



export default router;