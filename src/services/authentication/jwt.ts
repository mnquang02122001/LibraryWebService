import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
export interface IAuthToken {
    email: string;
    role: 'ROOT' | 'ADMIN';
}
export const generateToken = async (admin: IAuthToken) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ admin }, config.jwt.key, { expiresIn: config.jwt.time }, (err, token) => {
            if (err) {
                console.log(err);
                reject(new Error('Error when creating token'));
            } else {
                resolve(token);
            }
        });
    });
};
export const verifyToken = async (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt.key, (err, decoded) => {
            if (err) {
                console.log(err);
                reject(new Error('Error when verifying token'));
            } else {
                resolve(decoded);
            }
        });
    });
};
