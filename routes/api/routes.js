import express from 'express';
import registerRouter from '../../controllers/registerController.js';
const router = express.Router();

router.use('/register', registerRouter);

export default router;
