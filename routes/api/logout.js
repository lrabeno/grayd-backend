import express from 'express';
import handleLogout from '../../controllers/logoutController.js';
const router = express.Router();

// needs to be get route for logout
router.get('/', handleLogout);

export default router;
