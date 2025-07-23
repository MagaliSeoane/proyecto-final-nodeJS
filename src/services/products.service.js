import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} from '../models/products.model.js';

export const getAllProductsService = async () => {
  return await getAllProducts();
};

export const getProductByIdService = async (id) => {
  return await getProductById(id);
};

export const createProductService = async (productData) => {
  return await createProduct(productData);
};

export const deleteProductService = async (id) => {
  return await deleteProduct(id);
};
