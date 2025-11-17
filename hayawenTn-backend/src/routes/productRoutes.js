// src/routes/productRoutes.js - Routes des produits
const express = require('express');
const router = express.Router();

// Importer les controllers
const {
  getProducts,
  getProduct,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler
} = require('../controllers/productController');

// Importer le middleware d'authentification
const { protect } = require('../middleware/authMiddleware');

// ==================== ROUTES PUBLIQUES ====================

/**
 * @route   GET /api/products
 * @desc    Récupérer tous les produits avec filtres et pagination
 * @access  Public
 * @query   ?search=croquettes&category=food&animal_type=dog&min_price=10&max_price=100&page=1&limit=10
 */
router.get('/', getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Récupérer un produit par ID
 * @access  Public
 */
router.get('/:id', getProduct);

// ==================== ROUTES PROTÉGÉES ====================
// Pour l'instant, ces routes nécessitent juste d'être connecté
// Plus tard, on ajoutera un middleware isAdmin pour les réserver aux admins

/**
 * @route   POST /api/products
 * @desc    Créer un nouveau produit
 * @access  Private (Admin)
 */
router.post('/', protect, createProductHandler);

/**
 * @route   PUT /api/products/:id
 * @desc    Mettre à jour un produit
 * @access  Private (Admin)
 */
router.put('/:id', protect, updateProductHandler);

/**
 * @route   DELETE /api/products/:id
 * @desc    Supprimer un produit
 * @access  Private (Admin)
 */
router.delete('/:id', protect, deleteProductHandler);

module.exports = router;