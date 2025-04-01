import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
 
const connectDB =  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/HBMS')
.then(()=> console.log("MongoDB Connected")).catch(err => console.log(err));


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hospital Bed availability management system runs successfully');
});

app.use('/api/auth', userRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
console.log(`Server is running on port http://localhost:${PORT}`);
})