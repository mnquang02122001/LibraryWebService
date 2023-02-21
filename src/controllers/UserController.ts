import { validateUserCreated, validateUserUpdated } from './validators/UserValidator';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import * as CODE from '../constant/ResponseCode';
export const userController = {
    getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
        const page = parseInt(req.params.page);
        const size = parseInt(req.params.size);
        const searchBy = req.query.searchBy?.toString();
        const searchValue = req.query.searchValue;
        const sortBy = req.query.sortBy?.toString();
        const sortValue = req.query.sortValue || 'ASC';
        if (size < 1) {
            return res.status(400).json({
                code: CODE.USER_NOT_FOUND,
                data: 'Page size must not be less than one!'
            });
        }
        if (page < 0) {
            return res.status(400).json({
                code: CODE.USER_NOT_FOUND,
                data: 'Page index must not be less than zero!'
            });
        }
        try {
            const users = await User.find(searchBy ? { [searchBy]: searchValue } : {})
                .sort(sortBy ? { [sortBy]: sortValue === 'ASC' ? 1 : -1 } : {})
                .skip(page * size)
                .limit(size);
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    getUser: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.userId;
        try {
            const user = await User.findById(userId);
            if (user) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: user
                });
            }
            return res.status(400).json({
                code: CODE.USER_NOT_FOUND,
                data: 'USER NOT FOUND'
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        if (!validateUserCreated(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        try {
            const user = new User(req.body);
            await user.save();
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: user
            });
        } catch (error) {
            return res.status(400).json({
                code: CODE.USER_EXISTED,
                data: 'User"s email existed'
            });
        }
    },
    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        if (!validateUserUpdated(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const userId = req.params.userId;
        try {
            const user = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true });
            if (user) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: user
                });
            }
            return res.status(400).json({
                code: CODE.USER_NOT_FOUND,
                data: 'USER NOT FOUND'
            });
        } catch (error) {
            return res.status(400).json({
                code: CODE.USER_EXISTED,
                data: "User's email existed"
            });
        }
    },
    deleteUser: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.userId;
        try {
            const user = await User.findByIdAndDelete(userId);
            if (user) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: `Delete user who has id: ${userId} successfully`
                });
            }
            return res.status(400).json({
                code: CODE.USER_NOT_FOUND,
                data: 'USER NOT FOUND'
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }
};
