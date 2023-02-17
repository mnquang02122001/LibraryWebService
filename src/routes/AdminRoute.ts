import { Router } from 'express';
import { authenticate } from '../middleware/authentication/verifyToken';
import { authorizeRole } from '../middleware/authentication/authorization';
import { adminController } from '../controllers/AdminController';
const router = Router();

router.get('/', authenticate, authorizeRole('ROOT'), adminController.getAllAdmins);
router.get('/:adminId', authenticate, authorizeRole('ROOT'), adminController.getAdmin);
router.post('/addAdmin', authenticate, authorizeRole('ROOT'), adminController.createAdmin);
router.put('/editAdmin/:adminId', authenticate, authorizeRole('ROOT'), adminController.updateAdmin);
router.delete('/deleteAdmin/:adminId', authenticate, authorizeRole('ROOT'), adminController.deleteAdmin);

export default router;
