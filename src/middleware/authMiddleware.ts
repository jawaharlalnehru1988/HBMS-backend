import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: string | object; // Adjust type based on your decoded token structure
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization");
    if (!token) {
         res.status(401).send({ message: "Access denied. No token provided." });
         return;
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: "Invalid token" });
    }
};

export default authMiddleware;

