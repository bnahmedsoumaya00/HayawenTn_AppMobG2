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