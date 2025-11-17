// src/models/favoriteModel.js - Model pour les favoris
const { query } = require('../config/database');

/**
 * Récupérer tous les favoris d'un utilisateur
 */
const getUserFavorites = async (userId) => {
  try {
    // Récupérer les favoris avec les détails des items (produits ou annonces)
    const favorites = await query(
      `SELECT 
        f.id,
        f.user_id,
        f.item_id,
        f.item_type,
        f.created_at,
        CASE 
          WHEN f.item_type = 'product' THEN p.name
          WHEN f.item_type = 'announcement' THEN a.title
        END as item_name,
        CASE 
          WHEN f.item_type = 'product' THEN p.price
          WHEN f.item_type = 'announcement' THEN a.price
        END as item_price,
        CASE 
          WHEN f.item_type = 'product' THEN p.image_urls
          WHEN f.item_type = 'announcement' THEN a.image_urls
        END as item_image_urls,
        CASE 
          WHEN f.item_type = 'product' THEN p.category
          WHEN f.item_type = 'announcement' THEN a.type
        END as item_category
      FROM favorites f
      LEFT JOIN products p ON f.item_type = 'product' AND f.item_id = p.id
      LEFT JOIN announcements a ON f.item_type = 'announcement' AND f.item_id = a.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC`,
      [userId]
    );

    // Parser les image_urls et structurer les données
    const parsedFavorites = favorites.map(fav => ({
      id: fav.id,
      user_id: fav.user_id,
      item_id: fav.item_id,
      item_type: fav.item_type,
      created_at: fav.created_at,
      item: {
        name: fav.item_name || fav.item_title,
        price: fav.item_price,
        image_urls: fav.item_image_urls ? JSON.parse(fav.item_image_urls) : [],
        category: fav.item_category
      }
    }));

    return parsedFavorites;
  } catch (error) {
    console.error('Model error - getUserFavorites:', error);
    throw error;
  }
};

/**
 * Récupérer les favoris par type (products ou announcements)
 */
const getUserFavoritesByType = async (userId, itemType) => {
  try {
    const favorites = await query(
      `SELECT * FROM favorites 
       WHERE user_id = ? AND item_type = ?
       ORDER BY created_at DESC`,
      [userId, itemType]
    );

    return favorites;
  } catch (error) {
    console.error('Model error - getUserFavoritesByType:', error);
    throw error;
  }
};

/**
 * Vérifier si un item est dans les favoris
 */
const isFavorite = async (userId, itemId, itemType) => {
  try {
    const favorites = await query(
      'SELECT id FROM favorites WHERE user_id = ? AND item_id = ? AND item_type = ?',
      [userId, itemId, itemType]
    );

    return favorites.length > 0;
  } catch (error) {
    console.error('Model error - isFavorite:', error);
    throw error;
  }
};

/**
 * Ajouter aux favoris
 */
const addFavorite = async (userId, itemId, itemType) => {
  try {
    // Vérifier si déjà dans les favoris
    const alreadyExists = await isFavorite(userId, itemId, itemType);
    
    if (alreadyExists) {
      return { alreadyExists: true };
    }

    // Vérifier si l'item existe (produit ou annonce)
    let itemExists = false;
    
    if (itemType === 'product') {
      const products = await query('SELECT id FROM products WHERE id = ?', [itemId]);
      itemExists = products.length > 0;
    } else if (itemType === 'announcement') {
      const announcements = await query('SELECT id FROM announcements WHERE id = ?', [itemId]);
      itemExists = announcements.length > 0;
    }

    if (!itemExists) {
      return { itemNotFound: true };
    }

    // Ajouter aux favoris
    const result = await query(
      'INSERT INTO favorites (user_id, item_id, item_type) VALUES (?, ?, ?)',
      [userId, itemId, itemType]
    );

    return {
      id: result.insertId,
      user_id: userId,
      item_id: itemId,
      item_type: itemType
    };
  } catch (error) {
    console.error('Model error - addFavorite:', error);
    throw error;
  }
};

/**
 * Retirer des favoris
 */
const removeFavorite = async (favoriteId, userId) => {
  try {
    // Vérifier que le favori appartient à l'utilisateur
    const favorites = await query(
      'SELECT id FROM favorites WHERE id = ? AND user_id = ?',
      [favoriteId, userId]
    );

    if (favorites.length === 0) {
      return { notFound: true };
    }

    await query('DELETE FROM favorites WHERE id = ? AND user_id = ?', [favoriteId, userId]);
    
    return { deleted: true };
  } catch (error) {
    console.error('Model error - removeFavorite:', error);
    throw error;
  }
};

/**
 * Retirer des favoris par item_id et item_type
 */
const removeFavoriteByItem = async (userId, itemId, itemType) => {
  try {
    const result = await query(
      'DELETE FROM favorites WHERE user_id = ? AND item_id = ? AND item_type = ?',
      [userId, itemId, itemType]
    );

    if (result.affectedRows === 0) {
      return { notFound: true };
    }

    return { deleted: true };
  } catch (error) {
    console.error('Model error - removeFavoriteByItem:', error);
    throw error;
  }
};

/**
 * Supprimer tous les favoris d'un utilisateur
 */
const clearUserFavorites = async (userId) => {
  try {
    await query('DELETE FROM favorites WHERE user_id = ?', [userId]);
    return true;
  } catch (error) {
    console.error('Model error - clearUserFavorites:', error);
    throw error;
  }
};

/**
 * Compter les favoris d'un utilisateur
 */
const countUserFavorites = async (userId) => {
  try {
    const [result] = await query(
      'SELECT COUNT(*) as total FROM favorites WHERE user_id = ?',
      [userId]
    );

    return result.total;
  } catch (error) {
    console.error('Model error - countUserFavorites:', error);
    throw error;
  }
};

module.exports = {
  getUserFavorites,
  getUserFavoritesByType,
  isFavorite,
  addFavorite,
  removeFavorite,
  removeFavoriteByItem,
  clearUserFavorites,
  countUserFavorites
};