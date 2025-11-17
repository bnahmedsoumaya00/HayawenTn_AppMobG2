// src/middleware/uploadMiddleware.js - Configuration Multer pour upload images
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Créer les dossiers uploads s'ils n'existent pas
const createUploadDirs = () => {
  const dirs = [
    'uploads',
    'uploads/products',
    'uploads/announcements',
    'uploads/profiles',
    'uploads/veterinarians',
    'uploads/general'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
};

// Créer les dossiers au démarrage
createUploadDirs();

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Déterminer le dossier selon la route
    let folder = 'uploads/';
    
    if (req.originalUrl.includes('products')) {
      folder += 'products/';
    } else if (req.originalUrl.includes('announcements')) {
      folder += 'announcements/';
    } else if (req.originalUrl.includes('profile')) {
      folder += 'profiles/';
    } else if (req.originalUrl.includes('veterinarians')) {
      folder += 'veterinarians/';
    } else {
      folder += 'general/';
    }
    
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    // Générer un nom de fichier unique: timestamp-randomnumber.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, filename);
  }
});

// Filtre pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
  // Types de fichiers acceptés
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Format de fichier non supporté. Utilisez: jpeg, jpg, png, gif, webp'));
  }
};

// Configuration de multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max par fichier
  },
  fileFilter: fileFilter
});

module.exports = upload;