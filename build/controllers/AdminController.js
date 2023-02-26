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
exports.adminController = void 0;
const Admin_1 = __importDefault(require("../models/Admin"));
const CODE = __importStar(require("../constant/ResponseCode"));
const AdminValidator_1 = require("./validators/AdminValidator");
const password_1 = require("../services/authentication/password");
exports.adminController = {
    getAllAdmins: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admins = yield Admin_1.default.find({});
            return res.status(200).json({
                code: CODE.SUCCESS,
                data: admins
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    getAdmin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = req.params.adminId;
        try {
            const admin = yield Admin_1.default.findById(adminId);
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
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    createAdmin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, AdminValidator_1.validateAdminCreated)(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const { email, password, role, username } = req.body;
        try {
            const hashPassword = yield (0, password_1.generatePassword)(password);
            const newAdmin = new Admin_1.default({
                username,
                password: hashPassword,
                email,
                role
            });
            try {
                yield newAdmin.save();
                return res.status(200).json({
                    code: CODE.SUCCESS,
                    data: newAdmin
                });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({
                    code: CODE.ACCOUNT_EXISTED,
                    data: 'Admin is existed'
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    updateAdmin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = req.params.adminId;
        if (!(0, AdminValidator_1.validateAdminUpdated)(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid data'
            });
        }
        const { password } = req.body;
        try {
            if (password) {
                let hashPassword = yield (0, password_1.generatePassword)(password);
                try {
                    const admin = yield Admin_1.default.findByIdAndUpdate(adminId, {
                        $set: Object.assign(Object.assign({}, req.body), { password: hashPassword })
                    }, { new: true });
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
                }
                catch (error) {
                    console.log(error);
                    return res.status(400).json({
                        code: CODE.ACCOUNT_EXISTED,
                        data: 'Admin is existed'
                    });
                }
            }
            else {
                try {
                    const admin = yield Admin_1.default.findByIdAndUpdate(adminId, {
                        $set: req.body
                    }, { new: true });
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
                }
                catch (error) {
                    console.log(error);
                    return res.status(400).json({
                        code: CODE.ACCOUNT_EXISTED,
                        data: 'Admin is existed'
                    });
                }
            }
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    }),
    deleteAdmin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = req.params.adminId;
        try {
            const admin = yield Admin_1.default.findByIdAndDelete(adminId);
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
        }
        catch (error) {
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    })
};
