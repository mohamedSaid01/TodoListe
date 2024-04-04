import { number } from "joi";
import mongoose, { Schema, Document, PaginateModel} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

export interface ITodo extends Document {
    title: string;
    description: string;
    done: boolean;
}

const TodoSchema = new Schema ({
    title :{
        type : String,
        required : true
    },
    description: { 
        type : String,
        required : true
    },
    done:{
        type : Boolean,
        default : false
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
)

TodoSchema.plugin(mongoosePaginate)

export default mongoose.model<ITodo,PaginateModel<ITodo>>('Todo',TodoSchema)