import { Router } from 'express';
import { authenticate } from '../middleware/authentication/verifyToken';
import { authorizeRole } from '../middleware/authentication/authorization';
import { borrowCardController } from '../controllers/BorrowCardController';
const router = Router();

router.get('/', authenticate, authorizeRole('ADMIN'), borrowCardController.getAllBorrowCards);
router.get('/:borrowCardId', authenticate, authorizeRole('ADMIN'), borrowCardController.getBorrowCard);
router.post('/addBorrowCard', authenticate, authorizeRole('ADMIN'), borrowCardController.createBorrowCard);
router.put('/editBorrowCard/:borrowCardId', authenticate, authorizeRole('ADMIN'), borrowCardController.updateBorrowCard);
router.delete('/deleteBorrowCard/:borrowCardId', authenticate, authorizeRole('ADMIN'), borrowCardController.deleteBorrowCard);
export default router;
