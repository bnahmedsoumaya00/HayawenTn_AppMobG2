// src/controllers/announcementController.js - Contrôleur des annonces
const {
  getAllAnnouncements,
  getAnnouncementById,
  getUserAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  isAnnouncementOwner
} = require('../models/announcementModel');

/**
 * @desc    Récupérer toutes les annonces avec filtres
 * @route   GET /api/announcements
 * @access  Public
 */
exports.getAnnouncements = async (req, res) => {
  try {
    console.log('📢 Get announcements with filters:', req.query);

    const filters = {
      type: req.query.type || '',
      animal_type: req.query.animal_type || '',
      status: req.query.status || 'active',
      search: req.query.search || '',
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };

    const result = await getAllAnnouncements(filters);

    console.log(`✅ Found ${result.announcements.length} announcements`);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('❌ Get announcements error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des annonces'
    });
  }
};

/**
 * @desc    Récupérer une annonce par ID
 * @route   GET /api/announcements/:id
 * @access  Public
 */
exports.getAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`📢 Get announcement ID: ${id}`);

    const announcement = await getAnnouncementById(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Annonce non trouvée'
      });
    }

    console.log(`✅ Announcement found: ${announcement.title}`);

    res.status(200).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    console.error('❌ Get announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'annonce'
    });
  }
};

/**
 * @desc    Récupérer les annonces de l'utilisateur connecté
 * @route   GET /api/announcements/my
 * @access  Private
 */
exports.getMyAnnouncements = async (req, res) => {
  try {
    console.log(`📢 Get my announcements for user: ${req.user.id}`);

    const announcements = await getUserAnnouncements(req.user.id);

    console.log(`✅ Found ${announcements.length} announcements`);

    res.status(200).json({
      success: true,
      data: announcements
    });
  } catch (error) {
    console.error('❌ Get my announcements error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de vos annonces'
    });
  }
};

/**
 * @desc    Créer une nouvelle annonce
 * @route   POST /api/announcements
 * @access  Private
 */
exports.createAnnouncementHandler = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      animal_type,
      breed,
      age,
      price,
      image_urls,
      location,
      contact_phone
    } = req.body;

    console.log('📢 Create announcement:', title);

    // Validation
    if (!type || !title || !animal_type || !location || !contact_phone) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir type, titre, type d\'animal, localisation et téléphone'
      });
    }

    // Validation du type
    if (!['adoption', 'sale'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Type invalide (adoption ou sale)'
      });
    }

    // Validation du type d'animal
    const validAnimalTypes = ['dog', 'cat', 'bird', 'fish', 'rabbit', 'other'];
    if (!validAnimalTypes.includes(animal_type)) {
      return res.status(400).json({
        success: false,
        message: 'Type d\'animal invalide'
      });
    }

    // Si c'est une vente, le prix doit être fourni
    if (type === 'sale' && (!price || price <= 0)) {
      return res.status(400).json({
        success: false,
        message: 'Le prix est requis pour une annonce de vente'
      });
    }

    const announcement = await createAnnouncement({
      user_id: req.user.id,
      type,
      title,
      description,
      animal_type,
      breed,
      age,
      price: type === 'adoption' ? 0 : price,
      image_urls: image_urls || [],
      location,
      contact_phone
    });

    console.log(`✅ Announcement created with ID: ${announcement.id}`);

    res.status(201).json({
      success: true,
      message: 'Annonce créée avec succès',
      data: announcement
    });
  } catch (error) {
    console.error('❌ Create announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'annonce'
    });
  }
};

/**
 * @desc    Mettre à jour une annonce
 * @route   PUT /api/announcements/:id
 * @access  Private (propriétaire uniquement)
 */
exports.updateAnnouncementHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log(`📢 Update announcement ID: ${id}`);

    // Vérifier si l'annonce existe
    const announcement = await getAnnouncementById(id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Annonce non trouvée'
      });
    }

    // Vérifier si l'utilisateur est le propriétaire
    const isOwner = await isAnnouncementOwner(id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à modifier cette annonce'
      });
    }

    await updateAnnouncement(id, updates);

    console.log(`✅ Announcement updated: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Annonce mise à jour avec succès'
    });
  } catch (error) {
    console.error('❌ Update announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'annonce'
    });
  }
};

/**
 * @desc    Supprimer une annonce
 * @route   DELETE /api/announcements/:id
 * @access  Private (propriétaire uniquement)
 */
exports.deleteAnnouncementHandler = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`📢 Delete announcement ID: ${id}`);

    // Vérifier si l'annonce existe
    const announcement = await getAnnouncementById(id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Annonce non trouvée'
      });
    }

    // Vérifier si l'utilisateur est le propriétaire
    const isOwner = await isAnnouncementOwner(id, req.user.id);
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à supprimer cette annonce'
      });
    }

    await deleteAnnouncement(id);

    console.log(`✅ Announcement deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Annonce supprimée avec succès'
    });
  } catch (error) {
    console.error('❌ Delete announcement error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'annonce'
    });
  }
};

module.exports = exports;