"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdated = exports.validateUserCreated = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const emailPattern = "^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$";
const userCreatedSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string',
            maxLength: 50,
            pattern: emailPattern
        },
        newestBorrowDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        timeBorrow: {
            type: 'number',
            nullable: true
        }
    },
    required: ['name', 'email'],
    additionalProperties: false
};
const userUpdatedSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string',
            maxLength: 50,
            pattern: emailPattern
        },
        newestBorrowDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        timeBorrow: {
            type: 'number',
            nullable: true
        }
    },
    required: [],
    additionalProperties: false
};
exports.validateUserCreated = ajv.compile(userCreatedSchema);
exports.validateUserUpdated = ajv.compile(userUpdatedSchema);
