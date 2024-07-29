import express from 'express';
import registerRouter from '../../controllers/registerController.js';
import refreshRouter from '../../controllers/refreshTokenController.js';
import authRouter from '../../controllers/authController.js';
import logoutRouter from '../../controllers/logoutController.js';
import usersRouter from '../../controllers/usersController.js';
import employeeRouter from '../../controllers/employeesController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
const router = express.Router();

router.use('/register', registerRouter);

router.use('/auth', authRouter);

router.use('/refresh', refreshRouter);

router.use('/logout', logoutRouter);

//putting this line here will ensure the employees route needs a JWT to access
router.use(verifyJWT);

router.use('/users', usersRouter);

router.use('/employees', employeeRouter);

export default router;
