import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../services/authService";
import jwt from "jsonwebtoken";
import {enumsRole, IUser} from "../types/user";

export const protectedRoute =
    async (req: Request, res: Response, next: NextFunction) => {
        let token: string | undefined;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({message: 'Not authorized, no token'});
        }
        try {
            const result = await verifyToken(
                token
            ) as {
                valid: boolean,
                expired: boolean,
                decoded: jwt.JwtPayload & Partial<IUser> | null
            }
            if (result.valid) {
                const {id, username, email, role} = result.decoded!;
                req.body.auth = {id, username, email, role}
                next();
            } else if (result.expired) {
                return res.status(401).json({message: 'Token expired'});
            } else {
                return res.status(401).json({message: 'Invalid token'});
            }
        } catch (error) {
            res.status(401).json({message: 'Not authorized, token failed'});
        }
    }

export const isHasAdminRight = async (req: Request, res: Response, next: NextFunction) => {
    const owner = req.body.auth;
    if (!owner) {
        res.status(401).json({message: "Not authorized"})
    }
    if (owner.role !== enumsRole.Admin) {
        res.status(403).json({message: "Access denied. Admin rights required"})
    }
    next()
}

export const isHasManagerRight = async (req: Request, res: Response, next: NextFunction) => {
    const owner = req.body.auth;
    if (!owner) {
        res.status(401).json({message: "Not authorized"});
    }
    if (owner.role !== enumsRole.Manager) {
        res.status(403).json({message: "Access denied. Manager rights required"})
    }
    next()
}

export const isHasStaffRight = async (req: Request, res: Response, next: NextFunction) => {
    const owner = req.body.auth;
    if (!owner) {
        res.status(401).json({message: "Not authorized"});
    }
    if (owner.role !== enumsRole.Staff) {
        res.status(403).json({message: "Access denied. Staff rights required"})
    }
    next()
}


    