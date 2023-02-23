import { Request, Response, NextFunction } from 'express';
import * as CODE from '../constant/ResponseCode';
import { validateBorrowCardCreated, validateBorrowCardUpdated } from './validators/BorrowCardValidator';
import BorrowCard from '../models/BorrowCard';
import User from '../models/User';
import Admin from '../models/Admin';
import Book from '../models/Book';
export const borrowCardController = {
    getAllBorrowCards: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const borrowCards = await BorrowCard.find({});
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: borrowCards
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    getBorrowCard: async (req: Request, res: Response, next: NextFunction) => {
        const borrowCardId = req.params.borrowCardId;
        try {
            const borrowCard = await BorrowCard.findById(borrowCardId).populate([
                {
                    path: 'bookId'
                },
                {
                    path: 'userId'
                },
                {
                    path: 'adminId'
                }
            ]);
            if (borrowCard) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: borrowCard
                });
            }
            return res.status(400).json({
                code: CODE.BORROWINFORMATION_NOT_FOUND,
                data: 'Borrow Information not found'
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    createBorrowCard: async (req: Request, res: Response, next: NextFunction) => {
        if (!validateBorrowCardCreated(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const { bookId, userId, adminId, borrowDate } = req.body;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({
                    code: CODE.USER_NOT_FOUND,
                    data: "Borrow information can't find user"
                });
            }
            const admin = await Admin.findById(adminId);
            if (!admin) {
                return res.status(400).json({
                    code: CODE.ADMIN_NOT_FOUND,
                    data: "Borrow information can't find admin"
                });
            }
            const book = await Book.findById(bookId);
            if (!book) {
                return res.status(400).json({
                    code: CODE.BOOK_NOT_FOUND,
                    data: "Borrow information can't find book"
                });
            }
            const borrowCard = new BorrowCard(req.body);
            await borrowCard.save();
            await User.findByIdAndUpdate(userId, {
                $set: {
                    newestBorrowDate: Date.now(),
                    timeBorrow: user.timeBorrow + 1
                }
            });
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: borrowCard
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    updateBorrowCard: async (req: Request, res: Response, next: NextFunction) => {
        if (!validateBorrowCardUpdated(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const borrowCardId = req.params.borrowCardId;
        const { bookId, userId, adminId } = req.body;
        try {
            if (bookId) {
                const book = await Book.findById(bookId);
                if (!book) {
                    return res.status(400).json({
                        code: CODE.BOOK_NOT_FOUND,
                        data: 'BOOK NOT FOUND'
                    });
                }
            }
            if (userId) {
                const user = await User.findById(userId);
                if (!user) {
                    return res.status(400).json({
                        code: CODE.USER_NOT_FOUND,
                        data: 'USER NOT FOUND'
                    });
                }
            }
            if (adminId) {
                const admin = await Admin.findById(adminId);
                if (!admin) {
                    return res.status(400).json({
                        code: CODE.ADMIN_NOT_FOUND,
                        data: 'ADMIN NOT FOUND'
                    });
                }
            }
            const borrowCard = await BorrowCard.findByIdAndUpdate(
                borrowCardId,
                {
                    $set: req.body
                },
                { new: true }
            );
            if (borrowCard) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: borrowCard
                });
            }
            return res.status(400).json({
                code: CODE.BORROWINFORMATION_NOT_FOUND,
                data: 'BORROW INFORMATION NOT FOUND'
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    deleteBorrowCard: async (req: Request, res: Response, next: NextFunction) => {
        const borrowCardId = req.params.borrowCardId;
        try {
            const borrowCard = await BorrowCard.findByIdAndDelete(borrowCardId);
            if (borrowCard) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: `Delete borrow card has id: ${borrowCardId} successfully`
                });
            }
            return res.status(400).json({
                code: CODE.BORROWINFORMATION_NOT_FOUND,
                data: 'Borrow information is not found'
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }
};
