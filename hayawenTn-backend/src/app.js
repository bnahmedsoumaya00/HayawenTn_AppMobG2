const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

// ========================
// MIDDLEWARES GLOBAUX
// ========================

// Sécurité
app.use(helmet());

// CORS
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ========================
// ROUTES
// ========================

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: '🐾 Bienvenue sur l\'API HaywaneTN',
    version: '1.0.0',
    status: 'running'
  });
});

// API Routes (à ajouter plus tard)
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/products', require('./routes/products.routes'));
// app.use('/api/announcements', require('./routes/announcements.routes'));
// app.use('/api/veterinarians', require('./routes/veterinarians.routes'));
// app.use('/api/favorites', require('./routes/favorites.routes'));

// ========================
// ERROR HANDLING
// ========================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur serveur interne',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;