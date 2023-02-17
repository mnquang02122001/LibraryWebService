import Ajv, { JSONSchemaType } from 'ajv';
import { IAdmin } from '../../models/Admin';
const ajv = new Ajv();
const emailPattern =
    "^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$";
const rolePattern = '^(ADMIN)$';
const adminCreatedSchema: JSONSchemaType<IAdmin> = {
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
    required: ['username', 'password', 'email', 'role'],
    additionalProperties: false
};
const adminUpdatedSchema: JSONSchemaType<IAdmin> = {
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
export const validateAdminCreated = ajv.compile(adminCreatedSchema);
export const validateAdminUpdated = ajv.compile(adminUpdatedSchema);
