import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);

ajv.addFormat('objectid', /^[a-f\d]{24}$/i);
export interface IBorrowCardAjv {
    bookId: string[];
    userId: string;
    adminId: string;
    borrowDate: string;
    borrowTime: number;
}

const borrowCardCreatedSchema: JSONSchemaType<IBorrowCardAjv> = {
    type: 'object',
    properties: {
        bookId: {
            type: 'array',
            items: {
                type: 'string',
                format: 'objectid'
            }
        },
        userId: {
            type: 'string',
            format: 'objectId'
        },
        adminId: {
            type: 'string',
            format: 'objectId'
        },
        borrowDate: {
            type: 'string',
            format: 'date'
        },
        borrowTime: {
            type: 'integer',
            minimum: 0
        }
    },
    required: ['bookId', 'userId', 'adminId', 'borrowDate', 'borrowTime'],
    additionalProperties: false
};

const borrowCardUpdatedSchema: JSONSchemaType<IBorrowCardAjv> = {
    type: 'object',
    properties: {
        bookId: {
            type: 'array',
            items: {
                type: 'string',
                format: 'objectid'
            }
        },
        userId: {
            type: 'string',
            format: 'objectId'
        },
        adminId: {
            type: 'string',
            format: 'objectId'
        },
        borrowDate: {
            type: 'string',
            format: 'date'
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
