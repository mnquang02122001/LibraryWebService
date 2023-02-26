"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowCardController = void 0;
const CODE = __importStar(require("../constant/ResponseCode"));
const BorrowCardValidator_1 = require("./validators/BorrowCardValidator");
const BorrowCard_1 = __importDefault(require("../models/BorrowCard"));
const User_1 = __importDefault(require("../models/User"));
const Admin_1 = __importDefault(require("../models/Admin"));
const Book_1 = __importDefault(require("../models/Book"));
exports.borrowCardController = {
    getAllBorrowCards: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const borrowCards = yield BorrowCard_1.default.find({});
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: borrowCards
            });
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    getBorrowCard: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const borrowCardId = req.params.borrowCardId;
        try {
            const borrowCard = yield BorrowCard_1.default.findById(borrowCardId).populate([
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
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    createBorrowCard: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, BorrowCardValidator_1.validateBorrowCardCreated)(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const { bookId, userId, adminId, borrowDate } = req.body;
        try {
            const user = yield User_1.default.findById(userId);
            if (!user) {
                return res.status(400).json({
                    code: CODE.USER_NOT_FOUND,
                    data: "Borrow information can't find user"
                });
            }
            const admin = yield Admin_1.default.findById(adminId);
            if (!admin) {
                return res.status(400).json({
                    code: CODE.ADMIN_NOT_FOUND,
                    data: "Borrow information can't find admin"
                });
            }
            const book = yield Book_1.default.findById(bookId);
            if (!book) {
                return res.status(400).json({
                    code: CODE.BOOK_NOT_FOUND,
                    data: "Borrow information can't find book"
                });
            }
            const borrowCard = new BorrowCard_1.default(req.body);
            yield borrowCard.save();
            yield User_1.default.findByIdAndUpdate(userId, {
                $set: {
                    newestBorrowDate: Date.now(),
                    timeBorrow: user.timeBorrow + 1
                }
            });
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: borrowCard
            });
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    updateBorrowCard: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, BorrowCardValidator_1.validateBorrowCardUpdated)(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const borrowCardId = req.params.borrowCardId;
        const { bookId, userId, adminId } = req.body;
        try {
            if (bookId) {
                const book = yield Book_1.default.findById(bookId);
                if (!book) {
                    return res.status(400).json({
                        code: CODE.BOOK_NOT_FOUND,
                        data: 'BOOK NOT FOUND'
                    });
                }
            }
            if (userId) {
                const user = yield User_1.default.findById(userId);
                if (!user) {
                    return res.status(400).json({
                        code: CODE.USER_NOT_FOUND,
                        data: 'USER NOT FOUND'
                    });
                }
            }
            if (adminId) {
                const admin = yield Admin_1.default.findById(adminId);
                if (!admin) {
                    return res.status(400).json({
                        code: CODE.ADMIN_NOT_FOUND,
                        data: 'ADMIN NOT FOUND'
                    });
                }
            }
            const borrowCard = yield BorrowCard_1.default.findByIdAndUpdate(borrowCardId, {
                $set: req.body
            }, { new: true });
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
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    deleteBorrowCard: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const borrowCardId = req.params.borrowCardId;
        try {
            const borrowCard = yield BorrowCard_1.default.findByIdAndDelete(borrowCardId);
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
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    })
};
