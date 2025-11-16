// src/controllers/uploadController.js - Contrôleur upload images
const path = require('path');
const fs = require('fs');

/**
 * @desc    Upload une seule image
 * @route   POST /api/upload/single
 * @access  Private
 */
exports.uploadSingle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier uploadé'
      });
    }

    console.log('📸 Image uploaded:', req.file.filename);

    // Générer l'URL complète pour l'image
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Image uploadée avec succès',
      data: {
        filename: req.file.filename,
        url: fileUrl,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('❌ Upload single error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Upload plusieurs images (max 5)
 * @route   POST /api/upload/multiple
 * @access  Private
 */
exports.uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier uploadé'
      });
    }

    console.log(`📸 ${req.files.length} images uploaded`);

    // Générer les URLs pour tous les fichiers
    const filesData = req.files.map(file => ({
      filename: file.filename,
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.status(200).json({
      success: true,
      message: `${req.files.length} image(s) uploadée(s) avec succès`,
      data: filesData
    });
  } catch (error) {
    console.error('❌ Upload multiple error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Supprimer une image
 * @route   DELETE /api/upload/:filename
 * @access  Private
 */
exports.deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: 'Nom de fichier manquant'
      });
    }

    console.log('🗑️  Delete image:', filename);

    // Chercher le fichier dans tous les sous-dossiers
    const uploadsDir = path.join(__dirname, '../../uploads');
    let filePath = null;

    // Liste des sous-dossiers à vérifier
    const subdirs = ['products', 'announcements', 'profiles', 'veterinarians', 'general'];
    
    for (const subdir of subdirs) {
      const potentialPath = path.join(uploadsDir, subdir, filename);
      if (fs.existsSync(potentialPath)) {
        filePath = potentialPath;
        break;
      }
    }

    // Vérifier aussi à la racine du dossier uploads
    if (!filePath) {
      const rootPath = path.join(uploadsDir, filename);
      if (fs.existsSync(rootPath)) {
        filePath = rootPath;
      }
    }

    if (!filePath) {
      return res.status(404).json({
        success: false,
        message: 'Fichier non trouvé'
      });
    }

    // Supprimer le fichier
    fs.unlinkSync(filePath);

    console.log('✅ Image deleted:', filename);

    res.status(200).json({
      success: true,
      message: 'Image supprimée avec succès'
    });
  } catch (error) {
    console.error('❌ Delete image error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Lister toutes les images uploadées (Admin)
 * @route   GET /api/upload/list
 * @access  Private (Admin)
 */
exports.listImages = async (req, res) => {
  try {
    console.log('📋 List all images');

    const uploadsDir = path.join(__dirname, '../../uploads');
    const subdirs = ['products', 'announcements', 'profiles', 'veterinarians', 'general'];
    
    const allImages = [];

    for (const subdir of subdirs) {
      const dirPath = path.join(uploadsDir, subdir);
      
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        
        files.forEach(file => {
          const filePath = path.join(dirPath, file);
          const stats = fs.statSync(filePath);
          
          if (stats.isFile()) {
            allImages.push({
              filename: file,
              folder: subdir,
              url: `${req.protocol}://${req.get('host')}/uploads/${file}`,
              size: stats.size,
              createdAt: stats.birthtime
            });
          }
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        total: allImages.length,
        images: allImages
      }
    });
  } catch (error) {
    console.error('❌ List images error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = exports;