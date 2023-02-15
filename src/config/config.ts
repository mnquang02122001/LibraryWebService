import dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'dev';
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';
const JWT_EXPIRY_TIME = process.env.JWT_EXPIRY_TIME || '1h';

export const config = {
    mongo: {
        url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@library.0ixnnlw.mongodb.net/${NODE_ENV}?retryWrites=true&w=majority`,
    },
    server: {
        port: SERVER_PORT,
        env: NODE_ENV
    },
    jwt: {
        key: JWT_SECRET_KEY,
        time: JWT_EXPIRY_TIME
    }
}