// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password, displayName, phoneNumber } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir email, mot de passe et nom complet'
      });
    }

    const existingUser = await query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await query(
      'INSERT INTO users (email, password_hash, display_name, phone_number) VALUES (?, ?, ?, ?)',
      [email, passwordHash, displayName, phoneNumber || null]
    );

    const userId = result.insertId;
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: {
        id: userId,
        email,
        displayName,
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription'
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir email et mot de passe'
      });
    }

    const users = await query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      data: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        phoneNumber: user.phone_number,
        photoUrl: user.photo_url,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion'
    });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const users = await query(
      'SELECT id, email, display_name, phone_number, photo_url, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil'
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { displayName, phoneNumber, photoUrl } = req.body;

    const updates = [];
    const values = [];

    if (displayName) {
      updates.push('display_name = ?');
      values.push(displayName);
    }
    if (phoneNumber) {
      updates.push('phone_number = ?');
      values.push(phoneNumber);
    }
    if (photoUrl) {
      updates.push('photo_url = ?');
      values.push(photoUrl);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucune donnée à mettre à jour'
      });
    }

    values.push(req.user.id);

    await query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil'
    });
  }
};
// ==================== CHANGE PASSWORD ====================
/**
 * @desc    Changer le mot de passe (avec vérification ancien mot de passe)
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    console.log(`🔐 Change password for user: ${req.user.id}`);

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir ancien mot de passe, nouveau mot de passe et confirmation'
      });
    }

    // Vérifier que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Les mots de passe ne correspondent pas'
      });
    }

    // Validation longueur du nouveau mot de passe
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Récupérer l'utilisateur avec son mot de passe hashé
    const users = await query(
      'SELECT * FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const user = users[0];

    // Vérifier l'ancien mot de passe
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);

    if (!isOldPasswordValid) {
      console.log('❌ Old password incorrect');
      return res.status(401).json({
        success: false,
        message: 'Ancien mot de passe incorrect'
      });
    }

    // Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Mettre à jour le mot de passe
    await query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [newPasswordHash, req.user.id]
    );

    console.log(`✅ Password changed successfully for user: ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    console.error('❌ Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la modification du mot de passe'
    });
  }
};
// ==================== FORGOT PASSWORD ====================
/**
 * @desc    Demander un code de réinitialisation
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    console.log('🔑 Forgot password request for:', email);

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir votre email'
      });
    }

    // Vérifier si l'utilisateur existe
    const users = await query(
      'SELECT id, email FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      // Pour la sécurité, on ne dit pas que l'email n'existe pas
      return res.status(200).json({
        success: true,
        message: 'Si cet email existe, un code de réinitialisation a été envoyé'
      });
    }

    const user = users[0];

    // Générer un code à 6 chiffres
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Supprimer les anciens codes non utilisés de cet utilisateur
    await query(
      'DELETE FROM password_reset_codes WHERE user_id = ? AND used = FALSE',
      [user.id]
    );

    // Calculer l'expiration (15 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Sauvegarder le code
    await query(
      'INSERT INTO password_reset_codes (user_id, reset_code, expires_at) VALUES (?, ?, ?)',
      [user.id, resetCode, expiresAt]
    );

    console.log(`✅ Reset code generated for user ${user.id}: ${resetCode}`);
    console.log(`⏰ Code expires at: ${expiresAt}`);
    console.log('📧 [DEMO MODE] Reset code:', resetCode); // Pour la démo

    res.status(200).json({
      success: true,
      message: 'Code de réinitialisation envoyé',
      // ⚠️ EN PRODUCTION, NE JAMAIS ENVOYER LE CODE DANS LA RÉPONSE !
      // Pour la démo académique uniquement :
      resetCode: resetCode,
      note: 'En production, ce code serait envoyé par email'
    });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la génération du code'
    });
  }
};

// ==================== VERIFY RESET CODE ====================
/**
 * @desc    Vérifier le code de réinitialisation
 * @route   POST /api/auth/verify-reset-code
 * @access  Public
 */
exports.verifyResetCode = async (req, res) => {
  try {
    const { email, resetCode } = req.body;

    console.log('🔍 Verify reset code for:', email);

    // Validation
    if (!email || !resetCode) {
      return res.status(400).json({
        success: false,
        message: 'Email et code requis'
      });
    }

    // Récupérer l'utilisateur
    const users = await query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const user = users[0];

    // Vérifier le code
    const codes = await query(
      `SELECT * FROM password_reset_codes 
       WHERE user_id = ? AND reset_code = ? AND used = FALSE AND expires_at > NOW()`,
      [user.id, resetCode]
    );

    if (codes.length === 0) {
      console.log('❌ Invalid or expired code');
      return res.status(400).json({
        success: false,
        message: 'Code invalide ou expiré'
      });
    }

    console.log('✅ Code verified successfully');

    res.status(200).json({
      success: true,
      message: 'Code vérifié avec succès',
      data: {
        userId: user.id,
        email: email
      }
    });
  } catch (error) {
    console.error('❌ Verify code error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification du code'
    });
  }
};

// ==================== RESET PASSWORD ====================
/**
 * @desc    Réinitialiser le mot de passe avec le code
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, resetCode, newPassword, confirmPassword } = req.body;

    console.log('🔄 Reset password for:', email);

    // Validation
    if (!email || !resetCode || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    // Vérifier que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Les mots de passe ne correspondent pas'
      });
    }

    // Validation longueur
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Récupérer l'utilisateur
    const users = await query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const user = users[0];

    // Vérifier le code
    const codes = await query(
      `SELECT id FROM password_reset_codes 
       WHERE user_id = ? AND reset_code = ? AND used = FALSE AND expires_at > NOW()`,
      [user.id, resetCode]
    );

    if (codes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Code invalide ou expiré'
      });
    }

    const codeRecord = codes[0];

    // Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Mettre à jour le mot de passe
    await query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [passwordHash, user.id]
    );

    // Marquer le code comme utilisé
    await query(
      'UPDATE password_reset_codes SET used = TRUE WHERE id = ?',
      [codeRecord.id]
    );

    console.log('✅ Password reset successfully for user:', user.id);

    res.status(200).json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès'
    });
  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la réinitialisation du mot de passe'
    });
  }
};