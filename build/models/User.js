"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
