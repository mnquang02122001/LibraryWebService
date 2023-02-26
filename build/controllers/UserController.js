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
exports.userController = void 0;
const UserValidator_1 = require("./validators/UserValidator");
const User_1 = __importDefault(require("../models/User"));
const CODE = __importStar(require("../constant/ResponseCode"));
exports.userController = {
    getAllUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const page = parseInt(req.params.page);
        const size = parseInt(req.params.size);
        const searchBy = (_a = req.query.searchBy) === null || _a === void 0 ? void 0 : _a.toString();
        const searchValue = req.query.searchValue;
        const sortBy = (_b = req.query.sortBy) === null || _b === void 0 ? void 0 : _b.toString();
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
            const users = yield User_1.default.find(searchBy ? { [searchBy]: searchValue } : {})
                .sort(sortBy ? { [sortBy]: sortValue === 'ASC' ? 1 : -1 } : {})
                .skip(page * size)
                .limit(size);
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: users
            });
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    getUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const user = yield User_1.default.findById(userId);
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
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    createUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, UserValidator_1.validateUserCreated)(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        try {
            const user = new User_1.default(req.body);
            yield user.save();
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: user
            });
        }
        catch (error) {
            return res.status(400).json({
                code: CODE.USER_EXISTED,
                data: 'User"s email existed'
            });
        }
    }),
    updateUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, UserValidator_1.validateUserUpdated)(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const userId = req.params.userId;
        try {
            const user = yield User_1.default.findByIdAndUpdate(userId, { $set: req.body }, { new: true });
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
        }
        catch (error) {
            return res.status(400).json({
                code: CODE.USER_EXISTED,
                data: "User's email existed"
            });
        }
    }),
    deleteUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const user = yield User_1.default.findByIdAndDelete(userId);
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
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    })
};
