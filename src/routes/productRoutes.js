import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, restoreProduct } from '../controllers/productController.js';
import authorizeAdmin from '../middlewares/authorizeAdmin.js';
import { createReview } from '../controllers/reviewController.js';


const router = express.Router();

router.post('/', authorizeAdmin, createProduct);  // POST /api/product
router.get('/', authorizeAdmin, getAllProducts);                  // GET /api/product
router.get('/:id', authorizeAdmin, getProductById);  // GET /api/products/:id
router.put('/:id', authorizeAdmin, updateProduct);  // PUT /api/products/:id
router.delete('/:id', authorizeAdmin, deleteProduct);
router.patch('/:id', authorizeAdmin, restoreProduct);

router.post('/:productId/reviews', createReview);




export default router;
