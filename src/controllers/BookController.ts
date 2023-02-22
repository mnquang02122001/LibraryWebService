import { Request, Response, NextFunction } from 'express';
import { validateBookCreated, validateBookUpdated } from './validators/BookValidator';
import * as CODE from '../constant/ResponseCode';
import Book from '../models/Book';
export const bookController = {
    getAllBooks: async (req: Request, res: Response, next: NextFunction) => {
        const page = parseInt(req.params.page);
        const size = parseInt(req.params.size);
        const searchBy = <string>req.query.searchBy;
        const searchValue = req.query.searchValue;
        const sortBy = <string>req.query.sortBy;
        const sortValue = <string>req.query.sortValue || 'ASC';
        if (size < 1) {
            return res.status(400).json({
                code: CODE.BOOK_NOT_FOUND,
                data: 'Page size must not be less than one!'
            });
        }
        if (page < 0) {
            return res.status(400).json({
                code: CODE.BOOK_NOT_FOUND,
                data: 'Page index must not be less than zero!'
            });
        }
        try {
            const books = await Book.find(searchBy ? { [searchBy]: searchValue } : {})
                .sort(sortBy ? { [sortBy]: sortValue === 'ASC' ? 1 : -1 } : {})
                .skip(page * size)
                .limit(size);
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: books
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    getBook: async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;
        try {
            const book = await Book.findById(bookId);
            if (book) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: book
                });
            }
            return res.status(400).json({
                code: CODE.BOOK_NOT_FOUND,
                data: 'BOOK NOT FOUND'
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    },
    createBook: async (req: Request, res: Response, next: NextFunction) => {
        if (!validateBookCreated(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        try {
            const book = new Book(req.body);
            await book.save();
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: book
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                code: CODE.BOOK_EXISTED,
                data: 'Book existed'
            });
        }
    },
    updateBook: async (req: Request, res: Response, next: NextFunction) => {
        if (!validateBookUpdated(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const bookId = req.params.bookId;
        try {
            const book = await Book.findByIdAndUpdate(bookId, { $set: req.body }, { new: true });
            if (book) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: book
                });
            }
            return res.status(400).json({
                code: CODE.BOOK_NOT_FOUND,
                data: 'BOOK NOT FOUND'
            });
        } catch (error) {
            return res.status(400).json({
                code: CODE.BOOK_EXISTED,
                data: 'Book existed'
            });
        }
    },
    deleteBook: async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;
        try {
            const book = await Book.findByIdAndDelete(bookId);
            if (book) {
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: `Delete book has id: ${bookId} successfully`
                });
            }
            return res.status(400).json({
                code: CODE.BOOK_NOT_FOUND,
                data: 'BOOK NOT FOUND'
            });
        } catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }
};
