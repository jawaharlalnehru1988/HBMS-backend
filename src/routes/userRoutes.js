
import express from 'express';
import { getProfile, login, register } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', authMiddleware, getProfile);

export default userRouter;

