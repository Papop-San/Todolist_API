import mongoose, {Schema} from 'mongoose';

const TodoSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        default: ''
    },
    status:{
        type: String,
        enum: ["in-progress", "completed", "blocking" , 'cancelled'],
        default: "in-progress"  
    },
    assignee:{
        type: String,
        required: true
    },
    subscriberCounter:{
        type: Number,
        default: 0 
    }
}) 

export const todoModel = mongoose .model('todo', TodoSchema);