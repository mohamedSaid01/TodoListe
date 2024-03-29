import { NextFunction, Request, Response } from "express"
import { Schema } from 'joi';

export const validateSchema = (schema:Schema) => {
    return (req:Request, res:Response, next: NextFunction):void => {
        const {error} = schema.validate(req.body)
        if (error){
            console.log('error from validateSchema', error);
            const {details} = error
            const message = details?.map((err)=>err.message.replace(/['"]+/g, '')).join(',')
            res.status(400).json({message})
        }
        else{
            console.log('schema verified correcity, go to next step');
            next()
        }
    }
}