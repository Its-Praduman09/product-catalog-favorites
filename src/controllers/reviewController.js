
import mongoose from 'mongoose';
import Review from '../models/Review.js';  // Import the Review model

// Create a review controller
export const createReview = async (req, res) => {
  const { productId } = req.params; // Getting productId from the URL parameter
  const { rating, comment, userId } = req.body;

  // Check if the productId is valid
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    const newReview = new Review({
      productId,
      userId,
      rating,
      comment,
    });

    await newReview.save();
    return res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const reviews = await Review.find({ productId });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

