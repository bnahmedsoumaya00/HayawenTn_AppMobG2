import apiClient from './apiClient';

// Obtenir tous les produits
export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`/products?${params}`);
    return response.data;
  } catch (error) {
    console.error('Get products error:', error);
    throw error.response?.data || { message: 'Failed to fetch products' };
  }
};

// Obtenir un produit par ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get product error:', error);
    throw error.response?.data || { message: 'Failed to fetch product' };
  }
};

// Créer un nouveau produit
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Create product error:', error);
    throw error.response?.data || { message: 'Failed to create product' };
  }
};

// Mettre à jour un produit
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Update product error:', error);
    throw error.response?.data || { message: 'Failed to update product' };
  }
};

// Supprimer un produit
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete product error:', error);
    throw error.response?.data || { message: 'Failed to delete product' };
  }
};

// Rechercher des produits
export const searchProducts = async (searchTerm) => {
  try {
    const response = await apiClient.get(`/products/search?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('Search products error:', error);
    throw error.response?.data || { message: 'Failed to search products' };
  }
};