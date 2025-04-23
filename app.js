import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './src/routes/authRoutes.js'; // Ensure this is the correct path
import productRoutes from './src/routes/productRoutes.js'
import favoriteRoutes from './src/routes/favoriteRoutes.js'
import categoryRoutes from './src/routes/categoryRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';








// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Register routes
app.use('/api', authRoutes); // This should be correct
app.use('/api/products', productRoutes); //
app.use('/api/favorites', favoriteRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', reviewRoutes);





// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(process.env.PORT || 4000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  });
