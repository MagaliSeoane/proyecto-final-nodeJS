import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} from '../controllers/products.controller.js';

const router = express.Router();

// Rutas productos
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products/create', authenticate, createProduct);
router.delete('/products/:id', authenticate, deleteProduct);

export default router;
