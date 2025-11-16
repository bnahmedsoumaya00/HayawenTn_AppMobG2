// src/routes/announcementRoutes.js - Routes des annonces
const express = require('express');
const router = express.Router();

// Importer les controllers
const {
  getAnnouncements,
  getAnnouncement,
  getMyAnnouncements,
  createAnnouncementHandler,
  updateAnnouncementHandler,
  deleteAnnouncementHandler
} = require('../controllers/announcementController');

// Importer le middleware d'authentification
const { protect } = require('../middleware/authMiddleware');

// ==================== ROUTES PUBLIQUES ====================

/**
 * @route   GET /api/announcements
 * @desc    Récupérer toutes les annonces avec filtres
 * @access  Public
 * @query   ?type=adoption&animal_type=cat&status=active&search=chaton&page=1&limit=10
 */
router.get('/', getAnnouncements);

/**
 * @route   GET /api/announcements/:id
 * @desc    Récupérer une annonce par ID
 * @access  Public
 */
router.get('/:id', getAnnouncement);

// ==================== ROUTES PROTÉGÉES ====================

/**
 * @route   GET /api/announcements/my
 * @desc    Récupérer les annonces de l'utilisateur connecté
 * @access  Private
 * @note    IMPORTANT : Cette route doit être AVANT /:id sinon "my" sera traité comme un ID
 */
router.get('/my/list', protect, getMyAnnouncements);

/**
 * @route   POST /api/announcements
 * @desc    Créer une nouvelle annonce
 * @access  Private
 */
router.post('/', protect, createAnnouncementHandler);

/**
 * @route   PUT /api/announcements/:id
 * @desc    Mettre à jour une annonce
 * @access  Private (propriétaire uniquement)
 */
router.put('/:id', protect, updateAnnouncementHandler);

/**
 * @route   DELETE /api/announcements/:id
 * @desc    Supprimer une annonce
 * @access  Private (propriétaire uniquement)
 */
router.delete('/:id', protect, deleteAnnouncementHandler);

module.exports = router;