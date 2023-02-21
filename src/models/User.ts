import { Schema, model } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    newestBorrowDate: Date;
    timeBorrow: number;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        newestBorrowDate: {
            type: Date,
            default: new Date('2023-01-01')
        },
        timeBorrow: {
            type: Number,
            default: 0
        }
    },
    {
        versionKey: false
    }
);

const User = model<IUser>('User', userSchema);

export default User;
