// src/controllers/veterinarianController.js - Contrôleur des vétérinaires
const {
  getAllVeterinarians,
  getVeterinarianById,
  createVeterinarian,
  updateVeterinarian,
  deleteVeterinarian,
  getAllSpecialties,
  getAllGovernorates
} = require('../models/veterinarianModel');

/**
 * @desc    Récupérer tous les vétérinaires avec filtres
 * @route   GET /api/veterinarians
 * @access  Public
 */
exports.getVeterinarians = async (req, res) => {
  try {
    console.log('🏥 Get veterinarians with filters:', req.query);

    const filters = {
      specialty: req.query.specialty || '',
      governorate: req.query.governorate || '',
      search: req.query.search || ''
    };

    const veterinarians = await getAllVeterinarians(filters);

    console.log(`✅ Found ${veterinarians.length} veterinarians`);

    res.status(200).json({
      success: true,
      data: veterinarians
    });
  } catch (error) {
    console.error('❌ Get veterinarians error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des vétérinaires'
    });
  }
};

/**
 * @desc    Récupérer un vétérinaire par ID
 * @route   GET /api/veterinarians/:id
 * @access  Public
 */
exports.getVeterinarian = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`🏥 Get veterinarian ID: ${id}`);

    const veterinarian = await getVeterinarianById(id);

    if (!veterinarian) {
      return res.status(404).json({
        success: false,
        message: 'Vétérinaire non trouvé'
      });
    }

    console.log(`✅ Veterinarian found: ${veterinarian.name}`);

    res.status(200).json({
      success: true,
      data: veterinarian
    });
  } catch (error) {
    console.error('❌ Get veterinarian error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du vétérinaire'
    });
  }
};

/**
 * @desc    Récupérer toutes les spécialités
 * @route   GET /api/veterinarians/specialties/list
 * @access  Public
 */
exports.getSpecialties = async (req, res) => {
  try {
    console.log('🏥 Get all specialties');

    const specialties = await getAllSpecialties();

    res.status(200).json({
      success: true,
      data: specialties
    });
  } catch (error) {
    console.error('❌ Get specialties error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des spécialités'
    });
  }
};

/**
 * @desc    Récupérer tous les gouvernorats
 * @route   GET /api/veterinarians/governorates/list
 * @access  Public
 */
exports.getGovernorates = async (req, res) => {
  try {
    console.log('🏥 Get all governorates');

    const governorates = await getAllGovernorates();

    res.status(200).json({
      success: true,
      data: governorates
    });
  } catch (error) {
    console.error('❌ Get governorates error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des gouvernorats'
    });
  }
};

/**
 * @desc    Créer un nouveau vétérinaire
 * @route   POST /api/veterinarians
 * @access  Private (Admin uniquement)
 */
exports.createVeterinarianHandler = async (req, res) => {
  try {
    const {
      name,
      specialty,
      clinic_name,
      address,
      phone,
      email,
      photo_url,
      working_hours,
      governorate
    } = req.body;

    console.log('🏥 Create veterinarian:', name);

    // Validation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir au moins le nom et le téléphone'
      });
    }

    const veterinarian = await createVeterinarian({
      name,
      specialty,
      clinic_name,
      address,
      phone,
      email,
      photo_url,
      working_hours,
      governorate
    });

    console.log(`✅ Veterinarian created with ID: ${veterinarian.id}`);

    res.status(201).json({
      success: true,
      message: 'Vétérinaire créé avec succès',
      data: veterinarian
    });
  } catch (error) {
    console.error('❌ Create veterinarian error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du vétérinaire'
    });
  }
};

/**
 * @desc    Mettre à jour un vétérinaire
 * @route   PUT /api/veterinarians/:id
 * @access  Private (Admin uniquement)
 */
exports.updateVeterinarianHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log(`🏥 Update veterinarian ID: ${id}`);

    // Vérifier si le vétérinaire existe
    const veterinarian = await getVeterinarianById(id);
    if (!veterinarian) {
      return res.status(404).json({
        success: false,
        message: 'Vétérinaire non trouvé'
      });
    }

    await updateVeterinarian(id, updates);

    console.log(`✅ Veterinarian updated: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Vétérinaire mis à jour avec succès'
    });
  } catch (error) {
    console.error('❌ Update veterinarian error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du vétérinaire'
    });
  }
};

/**
 * @desc    Supprimer un vétérinaire
 * @route   DELETE /api/veterinarians/:id
 * @access  Private (Admin uniquement)
 */
exports.deleteVeterinarianHandler = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`🏥 Delete veterinarian ID: ${id}`);

    // Vérifier si le vétérinaire existe
    const veterinarian = await getVeterinarianById(id);
    if (!veterinarian) {
      return res.status(404).json({
        success: false,
        message: 'Vétérinaire non trouvé'
      });
    }

    await deleteVeterinarian(id);

    console.log(`✅ Veterinarian deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Vétérinaire supprimé avec succès'
    });
  } catch (error) {
    console.error('❌ Delete veterinarian error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du vétérinaire'
    });
  }
};

module.exports = exports;