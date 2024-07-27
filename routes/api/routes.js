import express from 'express';
import registerRouter from '../../controllers/registerController.js';
import refreshRouter from '../../controllers/refreshTokenController.js';
import authRouter from '../../controllers/authController.js';
import logoutRouter from '../../controllers/logoutController.js';
import employeeRouter from '../../controllers/employeesController.js';
const router = express.Router();

router.use('/register', registerRouter);

router.use('/refresh', refreshRouter);

router.use('/auth', authRouter);

router.use('/logout', logoutRouter);

router.use('/employees', employeeRouter);

export default router;
