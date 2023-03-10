"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middleware/authentication/verifyToken");
const authorization_1 = require("../middleware/authentication/authorization");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.get('/:page/:size', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), UserController_1.userController.getAllUsers);
router.get('/:userId', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), UserController_1.userController.getUser);
router.post('/addUser', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), UserController_1.userController.createUser);
router.put('/editUser/:userId', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), UserController_1.userController.updateUser);
router.delete('/deleteUser/:userId', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), UserController_1.userController.deleteUser);
exports.default = router;
