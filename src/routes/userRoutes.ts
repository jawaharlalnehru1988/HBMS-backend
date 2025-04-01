
import express from 'express';
import { login, register } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import { getUserById } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', authMiddleware, getUserById);

export default userRouter;

