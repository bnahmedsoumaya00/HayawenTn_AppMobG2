// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,      
    verifyResetCode,     
    resetPassword  } = require('../controllers/authController');
    
const { protect } = require('../middleware/authMiddleware');

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
/**
 * @route   PUT /api/auth/change-password
 * @desc    Changer le mot de passe
 * @access  Private
 */
router.put('/change-password', protect, changePassword);
/**
 * @route   POST /api/auth/forgot-password
 * @desc    Demander un code de réinitialisation
 * @access  Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route   POST /api/auth/verify-reset-code
 * @desc    Vérifier le code de réinitialisation
 * @access  Public
 */
router.post('/verify-reset-code', verifyResetCode);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Réinitialiser le mot de passe
 * @access  Public
 */
router.post('/reset-password', resetPassword);

module.exports = router;