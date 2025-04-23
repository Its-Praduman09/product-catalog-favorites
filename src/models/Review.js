// // models/Review.js
// import mongoose from 'mongoose';

// const reviewSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
// });

// const Review = mongoose.model('Review', reviewSchema);

// export default Review;
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true }); // Add timestamps if needed

const Review = mongoose.model('Review', reviewSchema);

// ✅ Export default
export default Review;
