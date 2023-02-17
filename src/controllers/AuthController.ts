import { Request, Response, NextFunction } from 'express';
import Admin from '../models/Admin';
import * as ROOT from '../constant/Root';
import * as CODE from '../constant/ResponseCode';
import { generateToken } from '../services/authentication/jwt';
import { comparePassword } from '../services/authentication/password';
import validateAuth from './validators/AuthValidator';
export const authController = {
    logIn: async (req: Request, res: Response, next: NextFunction) => {
        if (!validateAuth(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid email or password'
            });
        }
        const { email, userPassword } = req.body;
        try {
            let jwtToken = '';
            if (email === ROOT.EMAIL && userPassword === ROOT.PASSWORD) {
                jwtToken = <string>await generateToken({
                    email,
                    role: 'ROOT'
                });
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: {
                        jwtToken,
                        email,
                        role: 'ROOT'
                    }
                });
            }

            if (email === ROOT.EMAIL && userPassword !== ROOT.PASSWORD) {
                return res.status(400).json({
                    code: CODE.WRONG_PASS,
                    data: 'Password wrong'
                });
            }
            const admin = await Admin.findOne({ email: email }).exec();
            if (admin) {
                const passwordChecked = await comparePassword(userPassword, admin.password);
                if (passwordChecked) {
                    jwtToken = <string>await generateToken({
                        email,
                        role: 'ADMIN'
                    });
                    return res.status(200).json({
                        code: CODE.SUCCESS,
                        data: {
                            jwtToken,
                            email,
                            role: 'ADMIN'
                        }
                    });
                }
                return res.status(400).json({
                    code: CODE.WRONG_PASS,
                    data: 'Password wrong'
                });
            }

            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: "Account doesn't exist"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }
};

export default authController;
