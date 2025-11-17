// src/routes/favoriteRoutes.js - Routes des favoris
const express = require('express');
const router = express.Router();

// Importer les controllers
const {
  getFavorites,
  getFavoritesCount,
  checkFavorite,
  addToFavorites,
  removeFromFavorites,
  removeFromFavoritesByItem,
  clearAllFavorites
} = require('../controllers/favoriteController');

// Importer le middleware d'authentification
const { protect } = require('../middleware/authMiddleware');

// ==================== TOUTES LES ROUTES SONT PROTÉGÉES ====================
// Tous les favoris nécessitent d'être connecté

/**
 * @route   GET /api/favorites/count
 * @desc    Compter les favoris de l'utilisateur
 * @access  Private
 */
router.get('/count', protect, getFavoritesCount);

/**
 * @route   GET /api/favorites/check/:itemType/:itemId
 * @desc    Vérifier si un item est dans les favoris
 * @access  Private
 */
router.get('/check/:itemType/:itemId', protect, checkFavorite);

/**
 * @route   GET /api/favorites
 * @desc    Récupérer tous les favoris de l'utilisateur
 * @access  Private
 * @query   ?type=product (optionnel: filtrer par type)
 */
router.get('/', protect, getFavorites);

/**
 * @route   POST /api/favorites
 * @desc    Ajouter aux favoris
 * @access  Private
 * @body    { item_id: 1, item_type: "product" }
 */
router.post('/', protect, addToFavorites);

/**
 * @route   DELETE /api/favorites/all
 * @desc    Supprimer tous les favoris
 * @access  Private
 */
router.delete('/all', protect, clearAllFavorites);

/**
 * @route   DELETE /api/favorites/item/:itemType/:itemId
 * @desc    Retirer des favoris par item_id et item_type
 * @access  Private
 */
router.delete('/item/:itemType/:itemId', protect, removeFromFavoritesByItem);

/**
 * @route   DELETE /api/favorites/:id
 * @desc    Retirer des favoris par ID du favori
 * @access  Private
 */
router.delete('/:id', protect, removeFromFavorites);

module.exports = router;