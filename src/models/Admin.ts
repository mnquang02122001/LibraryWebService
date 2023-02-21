import { Schema, model } from 'mongoose';

export interface IAdmin {
    username: string;
    password: string;
    email: string;
    role: 'ROOT' | 'ADMIN';
}

const adminSchema = new Schema<IAdmin>(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            default: 'ADMIN'
        }
    },
    {
        versionKey: false
    }
);

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
