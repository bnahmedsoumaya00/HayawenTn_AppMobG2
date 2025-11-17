// src/routes/veterinarianRoutes.js - Routes des vétérinaires
const express = require('express');
const router = express.Router();

// Importer les controllers
const {
  getVeterinarians,
  getVeterinarian,
  getSpecialties,
  getGovernorates,
  createVeterinarianHandler,
  updateVeterinarianHandler,
  deleteVeterinarianHandler
} = require('../controllers/veterinarianController');

// Importer le middleware d'authentification
const { protect } = require('../middleware/authMiddleware');

// ==================== ROUTES PUBLIQUES ====================

/**
 * @route   GET /api/veterinarians/specialties/list
 * @desc    Récupérer toutes les spécialités disponibles
 * @access  Public
 */
router.get('/specialties/list', getSpecialties);

/**
 * @route   GET /api/veterinarians/governorates/list
 * @desc    Récupérer tous les gouvernorats
 * @access  Public
 */
router.get('/governorates/list', getGovernorates);

/**
 * @route   GET /api/veterinarians
 * @desc    Récupérer tous les vétérinaires avec filtres
 * @access  Public
 * @query   ?specialty=chirurgie&governorate=Tunis&search=ahmed
 */
router.get('/', getVeterinarians);

/**
 * @route   GET /api/veterinarians/:id
 * @desc    Récupérer un vétérinaire par ID
 * @access  Public
 */
router.get('/:id', getVeterinarian);

// ==================== ROUTES PROTÉGÉES ====================
// Pour l'instant, ces routes nécessitent juste d'être connecté
// Plus tard, on ajoutera un middleware isAdmin

/**
 * @route   POST /api/veterinarians
 * @desc    Créer un nouveau vétérinaire
 * @access  Private (Admin)
 */
router.post('/', protect, createVeterinarianHandler);

/**
 * @route   PUT /api/veterinarians/:id
 * @desc    Mettre à jour un vétérinaire
 * @access  Private (Admin)
 */
router.put('/:id', protect, updateVeterinarianHandler);

/**
 * @route   DELETE /api/veterinarians/:id
 * @desc    Supprimer un vétérinaire
 * @access  Private (Admin)
 */
router.delete('/:id', protect, deleteVeterinarianHandler);

module.exports = router;