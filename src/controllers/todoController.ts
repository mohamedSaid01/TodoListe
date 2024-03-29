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