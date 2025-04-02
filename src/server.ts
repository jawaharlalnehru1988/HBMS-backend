import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import bedRouter from './routes/bedRoutes';
import dotenv from 'dotenv';
import patientRouter from './routes/patientRoutes';
import bookingRouter from './routes/bookingRoutes';


const connectDB = mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/HBMS')
  .then(() => console.log("MongoDB Connected"))
  .catch((err: Error) => console.log(err));

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('Hospital Bed availability management system runs successfully' + process.env.NODE_ENV);
});

app.use('/api/auth', userRouter);
app.use('/api/beds', bedRouter);
app.use('/api/patient', patientRouter);
app.use('/api/booking', bookingRouter);

const PORT: number = parseInt(process.env.PORT || '4000', 10);
app.listen(PORT, (): void => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});