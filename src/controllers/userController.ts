import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
        res.json({ token, user: { id: user._id, name: user.username, email: user.email, role: user.role } });
    } catch (error) {
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

