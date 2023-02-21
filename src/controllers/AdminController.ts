import { Request, Response, NextFunction } from 'express';
import Admin from '../models/Admin';
import * as CODE from '../constant/ResponseCode';
import { validateAdminCreated, validateAdminUpdated } from './validators/AdminValidator';
import { generatePassword } from '../services/authentication/password';

export const adminController = {
    getAllAdmins: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const admins = await Admin.find({});
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: admins
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    getAdmin: async (req: Request, res: Response, next: NextFunction) => {
        const adminId = req.params.adminId;
        try {
            const admin = await Admin.findById(adminId);
            if (!admin) {
                return res.status(400).json({
                    code: CODE.ADMIN_NOT_FOUND,
                    data: 'ADMIN NOT FOUND'
                });
            }
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: admin
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    createAdmin: async (req: Request, res: Response, next: NextFunction) => {
        if (!validateAdminCreated(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const { email, password, role, username } = req.body;
        try {
            const hashPassword = await generatePassword(password);
            const newAdmin = new Admin({
                username,
                password: hashPassword,
                email,
                role
            });
            try {
                await newAdmin.save();
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: newAdmin
                });
            } catch (error) {
                console.log(error);
                return res.status(400).json({
                    code: CODE.ACCOUNT_EXISTED,
                    data: 'Admin is existed'
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    updateAdmin: async (req: Request, res: Response, next: NextFunction) => {
        const adminId = req.params.adminId;

        if (!validateAdminUpdated(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const { password } = req.body;
        try {
            if (password) {
                let hashPassword = await generatePassword(password);
                try {
                    const admin = await Admin.findByIdAndUpdate(
                        adminId,
                        {
                            $set: {
                                ...req.body,
                                password: hashPassword
                            }
                        },
                        { new: true }
                    );
                    if (!admin) {
                        return res.status(400).json({
                            code: CODE.ADMIN_NOT_FOUND,
                            data: 'ADMIN NOT FOUND'
                        });
                    }
                    return res.status(200).json({
                        code: CODE.SUCCESS,
                        data: admin
                    });
                } catch (error) {
                    console.log(error);
                    return res.status(400).json({
                        code: CODE.ACCOUNT_EXISTED,
                        data: 'Admin is existed'
                    });
                }
            } else {
                try {
                    const admin = await Admin.findByIdAndUpdate(
                        adminId,
                        {
                            $set: req.body
                        },
                        { new: true }
                    );
                    if (!admin) {
                        return res.status(400).json({
                            code: CODE.ADMIN_NOT_FOUND,
                            data: 'ADMIN NOT FOUND'
                        });
                    }
                    return res.status(200).json({
                        code: CODE.SUCCESS,
                        data: admin
                    });
                } catch (error) {
                    console.log(error);
                    return res.status(400).json({
                        code: CODE.ACCOUNT_EXISTED,
                        data: 'Admin is existed'
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    deleteAdmin: async (req: Request, res: Response, next: NextFunction) => {
        const adminId = req.params.adminId;
        try {
            const admin = await Admin.findByIdAndDelete(adminId);
            if (!admin) {
                return res.status(400).json({
                    code: CODE.ADMIN_NOT_FOUND,
                    data: 'ADMIN NOT FOUND'
                });
            }
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: `Delete admin has id ${adminId}`
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }
};
