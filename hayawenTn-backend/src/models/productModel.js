// src/models/productModel.js - Model pour les produits
const { query } = require('../config/database');

/**
 * Récupérer tous les produits avec filtres et pagination
 */
const getAllProducts = async (filters = {}) => {
  try {
    const {
      search = '',
      category = '',
      animal_type = '',
      min_price = 0,
      max_price = 999999,
      page = 1,
      limit = 10
    } = filters;

    // Calculer l'offset pour la pagination
    const offset = (page - 1) * limit;

    // Construire la requête SQL dynamiquement
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    // Filtre de recherche (nom ou description)
    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    // Filtre par catégorie
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    // Filtre par type d'animal
    if (animal_type) {
      sql += ' AND animal_type = ?';
      params.push(animal_type);
    }

    // Filtre par prix
    sql += ' AND price BETWEEN ? AND ?';
    params.push(min_price, max_price);

    // Seulement les produits disponibles
    sql += ' AND is_available = 1';

    // Compter le total (pour la pagination)
    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
    const [countResult] = await query(countSql, params);
    const total = countResult.total;

    // Ajouter l'ordre, limit et offset
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    // Exécuter la requête
    const products = await query(sql, params);

    // Parser les image_urls (JSON string -> array)
    const parsedProducts = products.map(product => ({
      ...product,
      image_urls: product.image_urls ? JSON.parse(product.image_urls) : []
    }));

    return {
      products: parsedProducts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Model error - getAllProducts:', error);
    throw error;
  }
};

/**
 * Récupérer un produit par ID
 */
const getProductById = async (id) => {
  try {
    const products = await query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (products.length === 0) {
      return null;
    }

    const product = products[0];
    
    // Parser les image_urls
    product.image_urls = product.image_urls ? JSON.parse(product.image_urls) : [];

    return product;
  } catch (error) {
    console.error('Model error - getProductById:', error);
    throw error;
  }
};

/**
 * Créer un nouveau produit
 */
const createProduct = async (productData) => {
  try {
    const {
      name,
      description,
      price,
      category,
      animal_type,
      image_urls = [],
      stock = 0
    } = productData;

    // Convertir image_urls array en JSON string
    const imageUrlsJson = JSON.stringify(image_urls);

    const result = await query(
      `INSERT INTO products 
       (name, description, price, category, animal_type, image_urls, stock) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, category, animal_type, imageUrlsJson, stock]
    );

    return {
      id: result.insertId,
      name,
      description,
      price,
      category,
      animal_type,
      image_urls,
      stock
    };
  } catch (error) {
    console.error('Model error - createProduct:', error);
    throw error;
  }
};

/**
 * Mettre à jour un produit
 */
const updateProduct = async (id, productData) => {
  try {
    const updates = [];
    const params = [];

    // Construire dynamiquement la requête UPDATE
    if (productData.name !== undefined) {
      updates.push('name = ?');
      params.push(productData.name);
    }
    if (productData.description !== undefined) {
      updates.push('description = ?');
      params.push(productData.description);
    }
    if (productData.price !== undefined) {
      updates.push('price = ?');
      params.push(productData.price);
    }
    if (productData.category !== undefined) {
      updates.push('category = ?');
      params.push(productData.category);
    }
    if (productData.animal_type !== undefined) {
      updates.push('animal_type = ?');
      params.push(productData.animal_type);
    }
    if (productData.image_urls !== undefined) {
      updates.push('image_urls = ?');
      params.push(JSON.stringify(productData.image_urls));
    }
    if (productData.stock !== undefined) {
      updates.push('stock = ?');
      params.push(productData.stock);
    }
    if (productData.is_available !== undefined) {
      updates.push('is_available = ?');
      params.push(productData.is_available);
    }

    if (updates.length === 0) {
      throw new Error('Aucune donnée à mettre à jour');
    }

    params.push(id);

    await query(
      `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    return true;
  } catch (error) {
    console.error('Model error - updateProduct:', error);
    throw error;
  }
};

/**
 * Supprimer un produit
 */
const deleteProduct = async (id) => {
  try {
    await query('DELETE FROM products WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Model error - deleteProduct:', error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};