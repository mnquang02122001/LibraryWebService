"use strict";
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
exports.comparePassword = exports.generatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generatePassword = (password, saltRounds = 10) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log(err);
                reject('Error when generating password');
            }
            else {
                resolve(hash);
            }
        });
    });
});
exports.generatePassword = generatePassword;
const comparePassword = (password, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, encryptedPassword, (err, result) => {
            if (err) {
                console.log(err);
                reject('Error when comparing password');
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.comparePassword = comparePassword;
