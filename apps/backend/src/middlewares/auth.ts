import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { email } from "zod";

declare global {
    namespace Express{
        interface Request{
            user?: any
        }
    }
}


export interface AuthRequest extends Request {
    user? : {
        userId: string,
        email: string
    }
}

export const authMiddleware = async(req : Request, res: Response, next: NextFunction) => {
    try{
        //get token form cookie or auth header
        const token = req.cookies.sessionToken || req.headers.authorization?.replace('Bearer ', '');
        if(!token) {
            res.status(401).json({
                message: "Authentication Required"
            });
            return;
        }

        //verify token
        const payload = jwt.verify(token, JWT_SECRET!) as any;

        if(payload.type !== 'session') {
            res.status(401).json({
                message: "Invalid token type"
            });
            return;
        }

        //attach user to request
        req.user = {
            userId: payload.userId,
            email : payload.email
        };
        next();             
    } catch (err){
        console.log(err);
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}