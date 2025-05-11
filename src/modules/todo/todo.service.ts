import { todoModel } from "../../models/todo.model"
 
export const createTodo = async( todoData: any ) =>{
    const newTodo = new todoModel(todoData);
    return await newTodo.save();
}

export const updateTodobyId = async( id: string , todoData: any ) =>{
    return todoModel.findByIdAndUpdate(id , todoData);
}

export const deletebyId = async (id: string) => {
    return todoModel.findByIdAndDelete(id); // or findByIdAndRemove
}

export const findManyTodolist  = async () => {
    return todoModel.find({}); 
} 