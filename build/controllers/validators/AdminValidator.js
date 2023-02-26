"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminUpdated = exports.validateAdminCreated = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const emailPattern = "^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$";
const rolePattern = '^(ADMIN)$';
const adminCreatedSchema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            maxLength: 50,
            minLength: 8
        },
        password: {
            type: 'string',
            maxLength: 50,
            minLength: 8
        },
        email: {
            type: 'string',
            maxLength: 50,
            pattern: emailPattern
        },
        role: {
            type: 'string',
            pattern: rolePattern
        }
    },
    required: ['username', 'password', 'email'],
    additionalProperties: false
};
const adminUpdatedSchema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            maxLength: 50,
            minLength: 8
        },
        password: {
            type: 'string',
            maxLength: 50,
            minLength: 8
        },
        email: {
            type: 'string',
            maxLength: 50,
            pattern: emailPattern
        },
        role: {
            type: 'string',
            pattern: rolePattern
        }
    },
    required: [],
    additionalProperties: false
};
exports.validateAdminCreated = ajv.compile(adminCreatedSchema);
exports.validateAdminUpdated = ajv.compile(adminUpdatedSchema);
