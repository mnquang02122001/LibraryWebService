"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const emailPattern = "^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$";
const authSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', maxLength: 50, pattern: emailPattern },
        userPassword: { type: 'string', maxLength: 50, minLength: 8 }
    },
    required: ['email', 'userPassword'],
    additionalProperties: false
};
const validate = ajv.compile(authSchema);
exports.default = validate;
