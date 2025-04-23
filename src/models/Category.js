import mongoose from 'mongoose';

// Define the Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }, // Name of the category (e.g., "Electronics", "Furniture")

  description: {
    type: String,
    required: true,
  }, // Description of the category

  status: {
    type: Boolean,
    default: true,
  }, // true = active, false = deleted

}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Create a model for Category
const Category = mongoose.model('Category', categorySchema);

// Export the Category model
export default Category;
