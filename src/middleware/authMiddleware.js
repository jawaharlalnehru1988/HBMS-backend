import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next)=>{
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided." });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
            } catch (ex) {
                res.status(400).json({message: "Invalid token"});
            }
                
}

export default authMiddleware;

