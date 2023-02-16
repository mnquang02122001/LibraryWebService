import { Schema, model } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    newestBorrowDate?: Schema.Types.Date;
    timeBorrow?: number;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        newestBorrowDate: {
            type: Date
        },
        timeBorrow: {
            type: Number
        }
    },
    {
        versionKey: false
    }
);

const User = model<IUser>('User', userSchema);

export default User;
