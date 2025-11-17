// src/controllers/favoriteController.js - Contrôleur des favoris
const {
  getUserFavorites,
  getUserFavoritesByType,
  isFavorite,
  addFavorite,
  removeFavorite,
  removeFavoriteByItem,
  clearUserFavorites,
  countUserFavorites
} = require('../models/favoriteModel');

/**
 * @desc    Récupérer tous les favoris de l'utilisateur connecté
 * @route   GET /api/favorites
 * @access  Private
 */
exports.getFavorites = async (req, res) => {
  try {
    const { type } = req.query; // Optionnel: filter par type (product ou announcement)

    console.log(`⭐ Get favorites for user: ${req.user.id}`);

    let favorites;

    if (type && ['product', 'announcement'].includes(type)) {
      favorites = await getUserFavoritesByType(req.user.id, type);
    } else {
      favorites = await getUserFavorites(req.user.id);
    }

    console.log(`✅ Found ${favorites.length} favorites`);

    res.status(200).json({
      success: true,
      data: favorites
    });
  } catch (error) {
    console.error('❌ Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des favoris'
    });
  }
};

/**
 * @desc    Compter les favoris de l'utilisateur
 * @route   GET /api/favorites/count
 * @access  Private
 */
exports.getFavoritesCount = async (req, res) => {
  try {
    console.log(`⭐ Count favorites for user: ${req.user.id}`);

    const count = await countUserFavorites(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        count: count
      }
    });
  } catch (error) {
    console.error('❌ Count favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du comptage des favoris'
    });
  }
};

/**
 * @desc    Vérifier si un item est dans les favoris
 * @route   GET /api/favorites/check/:itemType/:itemId
 * @access  Private
 */
exports.checkFavorite = async (req, res) => {
  try {
    const { itemType, itemId } = req.params;

    console.log(`⭐ Check favorite: ${itemType} ${itemId} for user ${req.user.id}`);

    // Validation
    if (!['product', 'announcement'].includes(itemType)) {
      return res.status(400).json({
        success: false,
        message: 'Type invalide (product ou announcement)'
      });
    }

    const isFav = await isFavorite(req.user.id, itemId, itemType);

    res.status(200).json({
      success: true,
      data: {
        isFavorite: isFav
      }
    });
  } catch (error) {
    console.error('❌ Check favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification du favori'
    });
  }
};

/**
 * @desc    Ajouter aux favoris
 * @route   POST /api/favorites
 * @access  Private
 */
exports.addToFavorites = async (req, res) => {
  try {
    const { item_id, item_type } = req.body;

    console.log(`⭐ Add to favorites: ${item_type} ${item_id} for user ${req.user.id}`);

    // Validation
    if (!item_id || !item_type) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir item_id et item_type'
      });
    }

    if (!['product', 'announcement'].includes(item_type)) {
      return res.status(400).json({
        success: false,
        message: 'Type invalide (product ou announcement)'
      });
    }

    const result = await addFavorite(req.user.id, item_id, item_type);

    // Vérifier les cas d'erreur
    if (result.alreadyExists) {
      return res.status(400).json({
        success: false,
        message: 'Cet item est déjà dans vos favoris'
      });
    }

    if (result.itemNotFound) {
      return res.status(404).json({
        success: false,
        message: 'Item non trouvé'
      });
    }

    console.log(`✅ Added to favorites with ID: ${result.id}`);

    res.status(201).json({
      success: true,
      message: 'Ajouté aux favoris avec succès',
      data: result
    });
  } catch (error) {
    console.error('❌ Add to favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout aux favoris'
    });
  }
};

/**
 * @desc    Retirer des favoris par ID du favori
 * @route   DELETE /api/favorites/:id
 * @access  Private
 */
exports.removeFromFavorites = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`⭐ Remove from favorites: ${id} for user ${req.user.id}`);

    const result = await removeFavorite(id, req.user.id);

    if (result.notFound) {
      return res.status(404).json({
        success: false,
        message: 'Favori non trouvé'
      });
    }

    console.log(`✅ Removed from favorites: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Retiré des favoris avec succès'
    });
  } catch (error) {
    console.error('❌ Remove from favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du favori'
    });
  }
};

/**
 * @desc    Retirer des favoris par item_id et item_type
 * @route   DELETE /api/favorites/item/:itemType/:itemId
 * @access  Private
 */
exports.removeFromFavoritesByItem = async (req, res) => {
  try {
    const { itemType, itemId } = req.params;

    console.log(`⭐ Remove from favorites by item: ${itemType} ${itemId}`);

    // Validation
    if (!['product', 'announcement'].includes(itemType)) {
      return res.status(400).json({
        success: false,
        message: 'Type invalide (product ou announcement)'
      });
    }

    const result = await removeFavoriteByItem(req.user.id, itemId, itemType);

    if (result.notFound) {
      return res.status(404).json({
        success: false,
        message: 'Favori non trouvé'
      });
    }

    console.log(`✅ Removed from favorites: ${itemType} ${itemId}`);

    res.status(200).json({
      success: true,
      message: 'Retiré des favoris avec succès'
    });
  } catch (error) {
    console.error('❌ Remove from favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du favori'
    });
  }
};

/**
 * @desc    Supprimer tous les favoris de l'utilisateur
 * @route   DELETE /api/favorites/all
 * @access  Private
 */
exports.clearAllFavorites = async (req, res) => {
  try {
    console.log(`⭐ Clear all favorites for user: ${req.user.id}`);

    await clearUserFavorites(req.user.id);

    console.log(`✅ All favorites cleared for user: ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Tous les favoris ont été supprimés'
    });
  } catch (error) {
    console.error('❌ Clear all favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression des favoris'
    });
  }
};

module.exports = exports;