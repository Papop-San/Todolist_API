import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

// Router 
import { router as todoRouter } from './modules/todo/todo.controller';

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript + Express!');
});

// Calling to use api 
app.use(todoRouter);
  
const startServer = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGOURL as string);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

startServer();
