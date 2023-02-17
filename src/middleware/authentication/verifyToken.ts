import { IAuthToken } from './../../services/authentication/jwt';
import { Request, Response, NextFunction } from 'express';
import * as CODE from '../../constant/ResponseCode';
import { verifyToken } from '../../services/authentication/jwt';
export interface IDecoded {
    admin: IAuthToken;
    iat: number;
    exp: number;
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.split(' ')[1] : '';
    if (!token) {
        return res.status(400).json({
            code: CODE.INVALID_TOKEN,
            data: 'No token found'
        });
    }
    try {
        const decoded = <IDecoded>await verifyToken(token);
        req.authToken = decoded.admin;
        next();
    } catch (code) {
        console.log(code);
        if (code == CODE.TOKEN_EXPIRED) {
            return res.status(400).json({ code, data: 'TOKEN EXPIRED' });
        } else {
            return res.status(400).json({ code, data: 'INVALID TOKEN' });
        }
    }
};
