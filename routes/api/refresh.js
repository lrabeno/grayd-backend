import express from 'express';
import handleRefreshToken from '../../controllers/refreshTokenController.js';
const router = express.Router();

// needs to be get route for refresh token
router.get('/', handleRefreshToken);

export default router;
