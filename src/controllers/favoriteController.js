import Favorite from '../models/Favorite.js';
import Product from '../models/Product.js';

// Toggle favorite
export const toggleFavorite = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.user;  // Assuming user is attached to the request after authentication

  try {
    const existingFavorite = await Favorite.findOne({ userId, productId });

    if (existingFavorite) {
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({ message: 'Product removed from favorites' });
    } else {
      const favorite = new Favorite({ userId, productId });
      await favorite.save();
      return res.status(200).json({ message: 'Product added to favorites' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error toggling favorite', error: err.message });
  }
};

// List user's favorites
export const getUserFavorites = async (req, res) => {
  const { userId } = req.user;

  try {
    const favorites = await Favorite.find({ userId }).populate('productId');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites', error: err.message });
  }
};
