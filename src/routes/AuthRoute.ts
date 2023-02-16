import { Router } from 'express';
import authController from '../controllers/AuthController';

const router = Router();

router.post('/authenticate', authController.logIn);

export default router;
