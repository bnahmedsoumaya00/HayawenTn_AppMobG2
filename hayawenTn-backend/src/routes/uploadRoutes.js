// src/routes/uploadRoutes.js - Routes upload
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { 
  uploadSingle, 
  uploadMultiple, 
  deleteImage,
  listImages
} = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

// ==================== TOUTES LES ROUTES SONT PROTÉGÉES ====================

/**
 * @route   POST /api/upload/single
 * @desc    Upload une seule image
 * @access  Private
 * @note    Utiliser form-data avec clé "image"
 */
router.post('/single', protect, upload.single('image'), uploadSingle);

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload plusieurs images (max 5)
 * @access  Private
 * @note    Utiliser form-data avec clé "images" (plusieurs fichiers)
 */
router.post('/multiple', protect, upload.array('images', 5), uploadMultiple);

/**
 * @route   GET /api/upload/list
 * @desc    Lister toutes les images (Admin)
 * @access  Private
 */
router.get('/list', protect, listImages);

/**
 * @route   DELETE /api/upload/:filename
 * @desc    Supprimer une image
 * @access  Private
 */
router.delete('/:filename', protect, deleteImage);

module.exports = router;