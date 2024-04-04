import User, { IUser } from "../database/Models/User";
import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'


const users : any = []

export const registreUser = async (req:Request, res:Response): Promise<void> => {
    try{
        const {username, email, password} = req.body;

        const existingUsre = await User.findOne({email})
        if(existingUsre){
            res.status(400).json({
                error: 'Email already exist in use'
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser : IUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        users.push(newUser)

        res.status(200).json({
            message: 'User created successfully',
            data: newUser
        })
    }
    catch(error:any){
        res.status(404).json({
            error:'ERROR HAPPEN AT REGISTRE USER !!',
        })
    }
} 

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const existingUser = users.find((user: IUser) => user.email === email); 

        if (!existingUser) {
            res.status(400).json({
                error: 'User does not exist'
            });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (passwordMatch) {
            res.status(200).json({
                message: 'User logged in successfully',
                data: existingUser
            });
        } else {
            res.status(400).json({
                error: 'Wrong password'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'ERROR HAPPEN AT LOGIN USER !!'
        });
    }
}
