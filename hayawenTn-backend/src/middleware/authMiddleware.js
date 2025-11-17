// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Non autorisé - Aucun token fourni'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const users = await query(
        'SELECT id, email, display_name, phone_number, photo_url FROM users WHERE id = ?',
        [decoded.id]
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Non autorisé - Utilisateur non trouvé'
        });
      }

      req.user = users[0];
      next();
      
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Non autorisé - Token invalide'
      });
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

module.exports = { protect };