import {Request, Response} from 'express'
import Todo from '../database/Models/Todo';


export const updateTodo = async (req:Request, res:Response): Promise<void> => {
    try{
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({
            status:'Todo updated successfully',
            data:updateTodo})
    }
    catch(error:any){
        res.status(404).json({
            status:'Todo not updated',
            message: error.message
        })
    }
} 