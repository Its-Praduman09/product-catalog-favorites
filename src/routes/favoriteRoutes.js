import express from 'express';
import { toggleFavorite, getUserFavorites } from '../controllers/favoriteController.js'; // Correct import
import {authenticateUser} from '../middlewares/authenticateUser.js'

const router = express.Router();

// Toggle favorite
router.post('/:productId', authenticateUser, toggleFavorite); // POST /api/favorites/:productId

// Get user's favorite products
router.get('/', authenticateUser, getUserFavorites); // GET /api/favorites

export default router;
