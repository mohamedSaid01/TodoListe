import {Request, Response} from 'express'
import Todo, { ITodo } from '../database/Models/Todo';

export const createTodo = async (req:Request, res:Response): Promise<void> => {
    try{
        const {title, description} = req.body
        console.log('received body', title, description);
        const newTodo:ITodo = new Todo({
            title: title,
            description: description,
        });
        const savedTodo:ITodo = await newTodo.save();
        res.status(200).json({
            message:'Todo created successfully',
            data:savedTodo})
    }
    catch(error){
        res.status(400).json({
            error: 'ERRIR HAPPEN AT CREATE TODO !!!'
        })
    }
} 


export const getOneTodoById = async (req:Request, res:Response): Promise<void> => {
    try{
        const {id} = req.params;
        const todo: ITodo | null = await Todo.findById(id);
        if (!todo){
            res.status(404).json({
                error:'Todo not found'})
                return
        }
        res.status(200).json({
            message:'Todo retourned successfully',
            todo})
    }
    catch(error){
        res.status(400).json({
            error:'ERROR HAPPEN AT GET TODO By ID !!',
        })
    }
}

export const updateOneTodoById = async (req:Request, res:Response): Promise<void> => {
    try{
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({
            status:'Todo updated successfully',
            data:updateTodo})
    }
    catch(error:any){
        res.status(404).json({
            error:'ERROR HAPPEN AT update TODO By ID !!',
        })
    }
} 

export const deleteTodoById = async (req:Request, res:Response): Promise<void> => {
    try{
        const {id} = req.params;
        await Todo.findByIdAndDelete(id, {deletAt: new Date()})
        res.status(200).json({message: 'Todo deleted successfully'})
    }
    catch(error) {
        res.status(400).json({
            error: 'Error Happen at delete one todo by id'
    })
}
}

export const findAllTodo = async (req:Request, res:Response): Promise<void> => {
    try{
        const todos = await Todo.find(); 
        res.status(200).json({
            todos: todos,
            message: 'Todos retourned successfully'
        });
    }

    catch(error){
        res.status(400).json({
            error: 'ERRoR HAPPEN AT GET ALL TODOS !!!'
        })
    }
}

export const findAllTodoPaginate = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1; 
    const pageSize = parseInt(req.query.pageSize as string) || 10; 

    try {
        const totalCount = await Todo.countDocuments(); 

        const totalPages = Math.ceil(totalCount / pageSize); 
        const skip = (page - 1) * pageSize; 

        const todos = await Todo.find()
            .skip(skip)
            .limit(pageSize); 

        res.status(200).json({
            todos: todos,
            currentPage: page,
            totalPages: totalPages,
            totalTodos: totalCount,
            message: 'Todos returned successfully'
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({
            error: 'Error happened at getting all todos!'
        });
    }
};
