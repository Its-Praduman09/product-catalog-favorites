import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId is an ObjectId (if using MongoDB)
    required: true,
    ref: 'User', // Make sure it references the User model if you're using Mongoose
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming productId is an ObjectId as well
    required: true,
    ref: 'Product', // Make sure it references the Product model
  },
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
