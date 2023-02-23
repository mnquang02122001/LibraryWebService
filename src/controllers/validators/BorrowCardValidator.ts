import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);
const objectIdPattern = '^[0-9a-fA-F]{24}$';
export interface IBorrowCardAjv {
    bookId: string;
    userId: string;
    adminId: string;
    borrowDate?: string;
    borrowTime: number;
}

const borrowCardCreatedSchema: JSONSchemaType<IBorrowCardAjv> = {
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

const borrowCardUpdatedSchema: JSONSchemaType<IBorrowCardAjv> = {
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
export const validateBorrowCardCreated = ajv.compile(borrowCardCreatedSchema);
export const validateBorrowCardUpdated = ajv.compile(borrowCardUpdatedSchema);
