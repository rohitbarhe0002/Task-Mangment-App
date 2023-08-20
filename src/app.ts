import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import taskRoutes from './routes/TaskRoutes'
import userRoutes from './routes/userRoutes'; 
import authRoutes from './routes/authRoutes'; 

const app = express();
const port =   3002;

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes); 
app.use('/auth', authRoutes); 

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions).then(() => {
    console.log("task managment DB is connected");
}).catch((e) => {
    console.log("no connection with task managment DB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export default app;