import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
const ajv = new Ajv();
addFormats(ajv);
const emailPattern =
    "^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$";
export interface IUserAjv {
    name: string;
    email: string;
    newestBorrowDate?: string;
    timeBorrow?: number;
}
const userCreatedSchema: JSONSchemaType<IUserAjv> = {
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

const userUpdatedSchema: JSONSchemaType<IUserAjv> = {
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
export const validateUserCreated = ajv.compile(userCreatedSchema);
export const validateUserUpdated = ajv.compile(userUpdatedSchema);
