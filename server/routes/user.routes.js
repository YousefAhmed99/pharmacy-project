import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.put('/profile', updateProfile);
router.get('/', authorize('admin'), getUsers);
router.get('/:id', authorize('admin'), getUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;





