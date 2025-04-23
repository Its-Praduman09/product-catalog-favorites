
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category model
  image: { type: String, required: true },
  status: { type: Boolean, default: true }, // true = active, false = deleted
  slug: { type: String, required: false }, // Make slug optional
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;

