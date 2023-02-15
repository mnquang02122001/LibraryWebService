import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from './config/config';
import { connectDb } from './database/database';

const app = express();
const PORT = config.server.port;

/** Connect to MongoDb */
connectDb();
// CORS configuration
app.use(cors());
// Use morgan to log requests to the console
app.use(morgan('dev'));
// Set up express body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    // Allow any origin to access this API, for developing purposes
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    if (req.method !== 'OPTIONS' && req.method !== 'GET' && req.method !== 'POST' && req.method !== 'DELETE' && req.method !== 'PATCH') {
        const error = new Error('Method is not allowed');
        return res.status(405).json({ message: error.message });
    }
    next();
});
// Routes

// Health check
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is OK' });
});

// Handle requests to invalid resources
app.use((req, res, next) => {
    const error = new Error('Invalid request! No resource was found!');
    console.log(error);
    return res.status(404).json({ message: error.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
