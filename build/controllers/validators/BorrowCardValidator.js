"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBorrowCardUpdated = exports.validateBorrowCardCreated = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const objectIdPattern = '^[0-9a-fA-F]{24}$';
const borrowCardCreatedSchema = {
    type: 'object',
    properties: {
        bookId: {
            type: 'string',
            pattern: objectIdPattern
        },
        userId: {
            type: 'string',
            pattern: objectIdPattern
        },
        adminId: {
            type: 'string',
            pattern: objectIdPattern
        },
        borrowDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        borrowTime: {
            type: 'integer',
            minimum: 0
        }
    },
    required: ['bookId', 'userId', 'adminId', 'borrowTime'],
    additionalProperties: false
};
const borrowCardUpdatedSchema = {
    type: 'object',
    properties: {
        bookId: {
            type: 'string',
            pattern: objectIdPattern
        },
        userId: {
            type: 'string',
            pattern: objectIdPattern
        },
        adminId: {
            type: 'string',
            pattern: objectIdPattern
        },
        borrowDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        borrowTime: {
            type: 'integer',
            minimum: 0
        }
    },
    required: [],
    additionalProperties: false
};
exports.validateBorrowCardCreated = ajv.compile(borrowCardCreatedSchema);
exports.validateBorrowCardUpdated = ajv.compile(borrowCardUpdatedSchema);
