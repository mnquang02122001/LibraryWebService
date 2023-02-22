import { Router } from 'express';
import { authenticate } from './../middleware/authentication/verifyToken';
import { authorizeRole } from '../middleware/authentication/authorization';
import { bookController } from '../controllers/BookController';
const router = Router();
router.get('/:page/:size', authenticate, authorizeRole('ADMIN'), bookController.getAllBooks);
router.get('/:bookId', authenticate, authorizeRole('ADMIN'), bookController.getBook);
router.post('/addBook', authenticate, authorizeRole('ADMIN'), bookController.createBook);
router.put('/editBook/:bookId', authenticate, authorizeRole('ADMIN'), bookController.updateBook);
router.delete('/deleteBook/:bookId', authenticate, authorizeRole('ADMIN'), bookController.deleteBook);

export default router;
