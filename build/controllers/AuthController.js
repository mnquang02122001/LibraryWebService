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
exports.authController = void 0;
const Admin_1 = __importDefault(require("../models/Admin"));
const ROOT = __importStar(require("../constant/Root"));
const CODE = __importStar(require("../constant/ResponseCode"));
const jwt_1 = require("../services/authentication/jwt");
const password_1 = require("../services/authentication/password");
const AuthValidator_1 = __importDefault(require("./validators/AuthValidator"));
exports.authController = {
    logIn: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, AuthValidator_1.default)(req.body)) {
            return res.status(400).json({
                code: CODE.INVALID_CREDENTIALS,
                data: 'Invalid email or password'
            });
        }
        const { email, userPassword } = req.body;
        try {
            let jwtToken = '';
            if (email === ROOT.EMAIL && userPassword === ROOT.PASSWORD) {
                jwtToken = (yield (0, jwt_1.generateToken)({
                    email,
                    role: 'ROOT'
                }));
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
            const admin = yield Admin_1.default.findOne({ email: email }).exec();
            if (admin) {
                const passwordChecked = yield (0, password_1.comparePassword)(userPassword, admin.password);
                if (passwordChecked) {
                    jwtToken = (yield (0, jwt_1.generateToken)({
                        email,
                        role: 'ADMIN'
                    }));
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
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                code: CODE.UNKNOWN_ERROR,
                data: error
            });
        }
    })
};
exports.default = exports.authController;
