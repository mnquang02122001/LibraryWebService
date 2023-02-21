import { Router } from 'express';
import { authenticate } from '../middleware/authentication/verifyToken';
import { authorizeRole } from '../middleware/authentication/authorization';
import { userController } from '../controllers/UserController';
const router = Router();

router.get('/:page/:size', authenticate, authorizeRole('ADMIN'), userController.getAllUsers);
router.get('/:userId', authenticate, authorizeRole('ADMIN'), userController.getUser);
router.post('/addUser', authenticate, authorizeRole('ADMIN'), userController.createUser);
router.put('/editUser/:userId', authenticate, authorizeRole('ADMIN'), userController.updateUser);
router.delete('/deleteUser/:userId', authenticate, authorizeRole('ADMIN'), userController.deleteUser);
export default router;
