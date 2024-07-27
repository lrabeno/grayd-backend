import express from 'express';
import registerRouter from '../../controllers/registerController.js';
import employeeRouter from '../../controllers/employeesController.js';
const router = express.Router();

router.use('/register', registerRouter);

router.use('/employees', employeeRouter);

export default router;
