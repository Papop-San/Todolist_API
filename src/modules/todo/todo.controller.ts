import { Router } from "express";
import { createTodo , deletebyId, updateTodobyId,findbyIdTodo ,findManyTodolist, findManyTodo } from "./todo.service";

export const router = Router();

// Create todo
router.post('/todos', async (req, res) => {
   try {
      const newTodo = await createTodo(req.body);
      res.send(newTodo);
      res.status(201).json(newTodo); 

   } catch (err) {
      console.log(err);
   }
});

// Update todo by Id
router.patch('/todos/:id', async (req, res) => {
   try{
      res.send( await updateTodobyId(
         req.params.id, 
         req.body 
      ));
      res.status(200).json({message: "Todo updated successfully"});
         
   }catch(err){
     console.log(err);
   }
})

// Delete todo by Id
router.delete("/todos/:id", async (req, res) => {
   try {
      const deletedTodo = await deletebyId(req.params.id);
      res.status(200).json(deletedTodo); 
   } catch (err) {
      res.status(500).send(err);
   }
});

// Get todo by Id
router.get('/todos/:id', async (req, res) => {
   try{
      const result = await findbyIdTodo(req.params.id);
   
      if (result === null) {
         res.status(404).json({ message: `Todo not found ==> ${req.params.id}` });
      }
      res.status(200).json(result);
   }catch(err){
      res.status(500).send(err);
   }
})

// Get all Search list 
router.get("/todos", async (req, res) => {
   try{
      const querylist  = await findManyTodo(req.query);
      res.send(querylist);
   }catch(err){
      res.status(500).send(err);
   }
})



// Get all todos
router.get('/todos', async (req, res) => {
   try{
     const list = await findManyTodolist();
     res.send(list);

   }catch(err){
      res.status(500).send(err);
   }
});

