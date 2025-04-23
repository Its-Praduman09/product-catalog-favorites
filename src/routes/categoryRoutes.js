import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Create Category
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', data: savedCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ status: true });
    res.status(200).json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
