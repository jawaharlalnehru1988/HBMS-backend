import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import User from "../models/User";
import logger from "../utils/logger";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        logger.info("Register endpoint hit");
        const { username, email, password, role } = req.body;
        logger.debug("Request body:", { username, email, role });
        let user = await User.findOne({ email });
        if (user) {
            logger.warn("User already exists:", { email });
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword, role });
        logger.debug("New user created:", user);
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        logger.error("Error in register:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        logger.info("Login endpoint hit");
        const { email, password } = req.body;
        logger.debug("Request body:", { email });
        logger.debug("Environment Variables:", process.env);
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn("Invalid credentials - user not found:", { email });
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn("Invalid credentials - password mismatch:", { email });
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const secret = process.env.JWT_SECRET || "mysecretkey";
        if (!secret) {
            logger.error("JWT_SECRET is not defined in environment variables");
            res.status(500).json({ message: "Server configuration error" });
            return;
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            secret,
            { expiresIn: "1h" }
        );
        logger.debug("Token generated for user:", { id: user._id });
        res.json({ token, message: "User Logged in Successfully" });
    } catch (error) {
        logger.error("Error in login:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const { name, email, password, role } = req.body;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password: hashedPassword, role }, { new: true }).select("-password");
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

