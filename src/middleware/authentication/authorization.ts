import { Request, Response, NextFunction } from 'express';
import * as CODE from '../../constant/ResponseCode';
export const authorizeRole = (role: 'ROOT' | 'ADMIN') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.authToken.role === role) {
            next();
        } else {
            return res.status(400).json({
                code: CODE.INVALID_TOKEN,
                data: 'WRONG ROLE'
            });
        }
    };
};
