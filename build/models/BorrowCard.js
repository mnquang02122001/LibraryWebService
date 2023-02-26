"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowCardSchema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    versionKey: false
});
const BorrowCard = (0, mongoose_1.model)('BorrowCard', borrowCardSchema);
exports.default = BorrowCard;
