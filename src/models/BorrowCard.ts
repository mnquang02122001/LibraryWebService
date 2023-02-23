import { Schema, model } from 'mongoose';

export interface IBorrowCard {
    bookId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    adminId: Schema.Types.ObjectId;
    borrowDate: Date;
    borrowTime: number;
}

const borrowCardSchema = new Schema<IBorrowCard>(
    {
        bookId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Book'
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        adminId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Admin'
        },
        borrowDate: {
            type: Date,
            default: new Date()
        },
        borrowTime: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    }
);

const BorrowCard = model<IBorrowCard>('BorrowCard', borrowCardSchema);

export default BorrowCard;
