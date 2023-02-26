"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookUpdated = exports.validateBookCreated = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const bookCreatedSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 50
        },
        author: {
            type: 'string',
            maxLength: 50
        },
        publishDate: {
            type: 'string',
            format: 'date'
        },
        price: {
            type: 'number',
            minimum: 0
        }
    },
    required: ['name', 'author', 'publishDate', 'price'],
    additionalProperties: false
};
const bookUpdatedSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 50
        },
        author: {
            type: 'string',
            maxLength: 50
        },
        publishDate: {
            type: 'string',
            format: 'date'
        },
        price: {
            type: 'number',
            minimum: 0
        }
    },
    required: [],
    additionalProperties: false
};
exports.validateBookCreated = ajv.compile(bookCreatedSchema);
exports.validateBookUpdated = ajv.compile(bookUpdatedSchema);
