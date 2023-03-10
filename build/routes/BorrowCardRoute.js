"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middleware/authentication/verifyToken");
const authorization_1 = require("../middleware/authentication/authorization");
const BorrowCardController_1 = require("../controllers/BorrowCardController");
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), BorrowCardController_1.borrowCardController.getAllBorrowCards);
router.get('/:borrowCardId', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), BorrowCardController_1.borrowCardController.getBorrowCard);
router.post('/addBorrowCard', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), BorrowCardController_1.borrowCardController.createBorrowCard);
router.put('/editBorrowCard/:borrowCardId', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), BorrowCardController_1.borrowCardController.updateBorrowCard);
router.delete('/deleteBorrowCard/:borrowCardId', verifyToken_1.authenticate, (0, authorization_1.authorizeRole)('ADMIN'), BorrowCardController_1.borrowCardController.deleteBorrowCard);
exports.default = router;
