import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import bedRouter from './routes/bedRoutes';
import dotenv from 'dotenv';
import patientRouter from './routes/patientRoutes';
import bookingRouter from './routes/bookingRoutes';
import { Environment } from './utils/environment';


const connectDB = mongoose
  .connect(Environment.ApiUrl || 'mongodb://localhost:27017/HBMS')
  .then(() => console.log("MongoDB Connected"))
  .catch((err: Error) => console.log(err));

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('Hospital Bed availability management system runs successfully ' + Environment.PORT);
});

app.use('/api/auth', userRouter);
app.use('/api/beds', bedRouter);
app.use('/api/patient', patientRouter);
app.use('/api/booking', bookingRouter);

app.listen(Environment.PORT, (): void => {
  console.log(`Server is running on port http://localhost:${Environment.PORT}`);
});