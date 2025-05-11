import { subscribe } from "diagnostics_channel";
import { todoModel } from "../../models/todo.model"
 
// Create
export const createTodo = async( todoData: any ) =>{
    const newTodo = new todoModel(todoData);
    return await newTodo.save();
}

// Update
export const updateTodobyId = async( id: string , todoData: any ) =>{
    return todoModel.findByIdAndUpdate(id , todoData);
}

// Delete
export const deletebyId = async (id: string) => {
    return todoModel.findByIdAndDelete(id); 
}

// Find
export const findbyIdTodo = async (id: string) => {
    return todoModel.findById(id); 
}

// Find All
export const findManyTodolist   = async () => {
    return todoModel.find({}); 
} 

// Find by QUERY
export const findManyTodo = async (query: any) => {
    let baseQuery = {};
    if (query.search){
        baseQuery ={ ...baseQuery , ...{
            title: {
                $regex: new RegExp(query.search, 'i')        
            }
        }};
    };

    if (query.status){
        baseQuery = { ...baseQuery , 
            status: {
                $regex: new RegExp(query.status )        
            }
        };
    }
    if (query.assignee){
        baseQuery = { ...baseQuery , 
            assignee: {
                $regex: new RegExp(query.assignee)        
            }
        };
    }
    // if (query.subscriberCounter){
    //     baseQuery = { ...baseQuery , 
    //         subscriberCounter: Number(query.subscriberCounter)
    //     };
    // }

    if (query.subscriberCounter && !query.condition) {
        baseQuery = {
            ...baseQuery,
            subscriberCounter: query.subscriberCounter
        };
    } 

    if (query.subscriberCounter && query?.condition === "or") {
        baseQuery = {
            ...baseQuery,
            $or: [
                { subscriberCounter: query.subscriberCounter },
            ]
        };
    }
    
    console.log(baseQuery);  

    return todoModel.find(baseQuery);
};

