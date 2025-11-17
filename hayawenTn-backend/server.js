// server.js - Point d'entrée du backend
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();

// Importer la connexion DB
const { testConnection } = require('./src/config/database');

// Importer les routes
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const announcementRoutes = require('./src/routes/announcementRoutes'); // ← AJOUTE
const veterinarianRoutes = require('./src/routes/veterinarianRoutes');
const favoriteRoutes = require('./src/routes/favoriteRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');

// Importer le gestionnaire d'erreurs
const errorHandler = require('./src/middleware/errorHandler');

// Initialiser Express
const app = express();

// ========== MIDDLEWARE ==========
// CORS - permettre les requêtes depuis le frontend
app.use(cors());

// Parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== ROUTES ==========
// Route de santé (health check)
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🐾 HaywaneTN API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/announcements', announcementRoutes); // ← AJOUTE
app.use('/api/veterinarians', veterinarianRoutes);
app.use('/api/favorites', favoriteRoutes); 
app.use('/api/upload', uploadRoutes);

// Route 404 - endpoint non trouvé
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found`
  });
});

// ========== GESTION DES ERREURS ==========
app.use(errorHandler);

// ========== DÉMARRAGE DU SERVEUR ==========
const PORT = process.env.PORT || 5000;

// Tester la connexion DB avant de démarrer
testConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log('');
      console.log('╔════════════════════════════════════════╗');
      console.log('║   🐾 HaywaneTN API Server Started    ║');
      console.log('╚════════════════════════════════════════╝');
      console.log('');
      console.log(`🚀 Server:      http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💾 Database:    ${process.env.DB_NAME}`);
      console.log('');
      console.log('✅ Ready to accept requests!');
      console.log('');
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  });

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});