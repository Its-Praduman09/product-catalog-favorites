// // routes/reviewRoutes.js
// import express from 'express';
// import { getReviewsByProductId } from '../controllers/reviewController.js';
// import authorizeUser from '../middlewares/authorizeUser.js'; // Assume you have this middleware

// const router = express.Router();

// // router.post('/:productId', authorizeUser, addReview);
// // router.get('/:productId', getReviewsByProductId);

// router.post('/:productId/reviews', authorizeUser, createReview);
// router.get('/products/:productId/reviews', authorizeUser, getReviewsByProductId);



// export default router;


// routes/reviewRoutes.js
import express from 'express';
import { createReview, getReviewsByProductId } from '../controllers/reviewController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js'; // Assuming you have this middleware

const router = express.Router();

// POST route to add a review for a specific product
router.post('/:productId/reviews', authenticateUser, createReview); // Ensure createReview function is defined

// GET route to get all reviews for a specific product
router.get('/:productId/reviews', authenticateUser, getReviewsByProductId); // This handles GET request

export default router;
