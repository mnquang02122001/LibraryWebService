"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const database_1 = require("./database/database");
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const AdminRoute_1 = __importDefault(require("./routes/AdminRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const BookRoute_1 = __importDefault(require("./routes/BookRoute"));
const BorrowCardRoute_1 = __importDefault(require("./routes/BorrowCardRoute"));
const app = (0, express_1.default)();
const PORT = config_1.config.server.port;
/** Connect to MongoDb */
(0, database_1.connectDb)();
// CORS configuration
app.use((0, cors_1.default)());
// Use morgan to log requests to the console
app.use((0, morgan_1.default)('dev'));
// Set up express body-parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    // Allow any origin to access this API, for developing purposes
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    if (req.method !== 'OPTIONS' &&
        req.method !== 'GET' &&
        req.method !== 'POST' &&
        req.method !== 'DELETE' &&
        req.method !== 'PATCH' &&
        req.method !== 'PUT') {
        const error = new Error('Method is not allowed');
        return res.status(405).json({ message: error.message });
    }
    next();
});
// Routes
// Health check
app.use('/api/v1/authenticate', AuthRoute_1.default);
app.use('/api/v1/admins', AdminRoute_1.default);
app.use('/api/v1/users', UserRoute_1.default);
app.use('/api/v1/books', BookRoute_1.default);
app.use('/api/v1/borrowed-information', BorrowCardRoute_1.default);
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
