import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { IBook } from '../../models/Book';
const ajv = new Ajv();
addFormats(ajv);
export interface IBookAjv {
    name: string;
    author: string;
    publishDate: string;
    price: number;
}
const bookCreatedSchema: JSONSchemaType<IBookAjv> = {
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

const bookUpdatedSchema: JSONSchemaType<IBookAjv> = {
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
export const validateBookCreated = ajv.compile(bookCreatedSchema);
export const validateBookUpdated = ajv.compile(bookUpdatedSchema);
