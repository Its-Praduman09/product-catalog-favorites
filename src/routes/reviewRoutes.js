
import express from 'express';
import { createReview, getReviewsByProductId } from '../controllers/reviewController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js'; // Assuming you have this middleware

const router = express.Router();

// POST route to add a review for a specific product
router.post('/:productId/reviews', authenticateUser, createReview); // Ensure createReview function is defined

// GET route to get all reviews for a specific product
router.get('/:productId/reviews', authenticateUser, getReviewsByProductId); // This handles GET request

export default router;
