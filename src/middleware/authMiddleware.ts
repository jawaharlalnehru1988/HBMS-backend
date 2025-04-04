import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = "mysecretkey";
interface AuthenticatedRequest extends Request {
    user?: string | object; // Adjust type based on your decoded token structure
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        res.status(401).send({ message: "Access denied. No token provided." });
        return;
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader; // Remove "Bearer " prefix
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: "Invalid token" });
    }
};

export default authMiddleware;

