import mongoose from 'mongoose';
import { config } from '../config/config';
mongoose.set('strictQuery', false);
export const connectDb = async () => {
    try {
        await mongoose.connect(config.mongo.url);
        console.log('Connect mongodb successfully');
    } catch (error) {
        console.log(error);
    }
};
