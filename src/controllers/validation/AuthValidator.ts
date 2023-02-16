import Ajv, { JSONSchemaType } from 'ajv';
const ajv = new Ajv();
export interface IAuth {
    email: string;
    userPassword: string;
}
const emailPattern =
    "^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$";
const authSchema: JSONSchemaType<IAuth> = {
    type: 'object',
    properties: {
        email: { type: 'string', maxLength: 50, pattern: emailPattern },
        userPassword: { type: 'string', maxLength: 50, minLength: 8 }
    },
    required: ['email', 'userPassword'],
    additionalProperties: false
};

const validate = ajv.compile(authSchema);

export default validate;
