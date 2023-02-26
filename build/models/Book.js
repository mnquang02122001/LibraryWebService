"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
}, {
    versionKey: false
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
