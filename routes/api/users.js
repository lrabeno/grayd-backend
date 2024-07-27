import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getUser,
} from '../../controllers/usersController.js';
import ROLES_LIST from '../../config/roles_list.js';

const router = express.Router();

router.route('/').get(getAllUsers).delete(deleteUser);

router.route('/:id').get(getUser);

export default router;
