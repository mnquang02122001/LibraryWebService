import { Schema, model } from 'mongoose';

export interface IBook {
    name: string;
    author: string;
    publishDate: Schema.Types.Date;
    price: number;
}

const bookSchema = new Schema<IBook>(
    {
        name: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishDate: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    }
);

const Book = model<IBook>('Book', bookSchema);

export default Book;
