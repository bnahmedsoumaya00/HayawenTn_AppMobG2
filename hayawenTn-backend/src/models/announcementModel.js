// src/models/announcementModel.js - Model pour les annonces
const { query } = require('../config/database');

/**
 * Récupérer toutes les annonces avec filtres et pagination
 */
const getAllAnnouncements = async (filters = {}) => {
  try {
    const {
      type = '',           // 'adoption' ou 'sale'
      animal_type = '',
      status = 'active',   // 'active' ou 'closed'
      search = '',
      page = 1,
      limit = 10
    } = filters;

    const offset = (page - 1) * limit;

    // Construire la requête avec jointure pour récupérer les infos user
    let sql = `
      SELECT 
        a.*,
        u.display_name as user_name,
        u.photo_url as user_photo
      FROM announcements a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    // Filtres
    if (type) {
      sql += ' AND a.type = ?';
      params.push(type);
    }

    if (animal_type) {
      sql += ' AND a.animal_type = ?';
      params.push(animal_type);
    }

    if (status) {
      sql += ' AND a.status = ?';
      params.push(status);
    }

    if (search) {
      sql += ' AND (a.title LIKE ? OR a.description LIKE ? OR a.breed LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Compter le total
    const countSql = sql.replace(
      'SELECT a.*, u.display_name as user_name, u.photo_url as user_photo',
      'SELECT COUNT(*) as total'
    );
    const [countResult] = await query(countSql, params);
    const total = countResult.total;

    // Ajouter ordre, limit et offset
    sql += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    // Exécuter la requête
    const announcements = await query(sql, params);

    // Parser les image_urls
    const parsedAnnouncements = announcements.map(announcement => ({
      ...announcement,
      image_urls: announcement.image_urls ? JSON.parse(announcement.image_urls) : [],
      user: {
        display_name: announcement.user_name,
        photo_url: announcement.user_photo
      }
    }));

    // Supprimer les champs temporaires
    parsedAnnouncements.forEach(a => {
      delete a.user_name;
      delete a.user_photo;
    });

    return {
      announcements: parsedAnnouncements,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Model error - getAllAnnouncements:', error);
    throw error;
  }
};

/**
 * Récupérer une annonce par ID
 */
const getAnnouncementById = async (id) => {
  try {
    const announcements = await query(
      `SELECT 
        a.*,
        u.display_name as user_name,
        u.phone_number as user_phone,
        u.photo_url as user_photo
      FROM announcements a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = ?`,
      [id]
    );

    if (announcements.length === 0) {
      return null;
    }

    const announcement = announcements[0];
    
    // Parser les image_urls
    announcement.image_urls = announcement.image_urls ? JSON.parse(announcement.image_urls) : [];
    
    // Structurer les infos user
    announcement.user = {
      display_name: announcement.user_name,
      phone_number: announcement.user_phone,
      photo_url: announcement.user_photo
    };

    // Supprimer les champs temporaires
    delete announcement.user_name;
    delete announcement.user_phone;
    delete announcement.user_photo;

    return announcement;
  } catch (error) {
    console.error('Model error - getAnnouncementById:', error);
    throw error;
  }
};

/**
 * Récupérer les annonces d'un utilisateur
 */
const getUserAnnouncements = async (userId) => {
  try {
    const announcements = await query(
      'SELECT * FROM announcements WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    // Parser les image_urls
    const parsedAnnouncements = announcements.map(announcement => ({
      ...announcement,
      image_urls: announcement.image_urls ? JSON.parse(announcement.image_urls) : []
    }));

    return parsedAnnouncements;
  } catch (error) {
    console.error('Model error - getUserAnnouncements:', error);
    throw error;
  }
};

/**
 * Créer une nouvelle annonce
 */
const createAnnouncement = async (announcementData) => {
  try {
    const {
      user_id,
      type,
      title,
      description,
      animal_type,
      breed,
      age,
      price = 0,
      image_urls = [],
      location,
      contact_phone
    } = announcementData;

    // Convertir image_urls en JSON string
    const imageUrlsJson = JSON.stringify(image_urls);

    const result = await query(
      `INSERT INTO announcements 
       (user_id, type, title, description, animal_type, breed, age, price, 
        image_urls, location, contact_phone, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [user_id, type, title, description, animal_type, breed, age, price, 
       imageUrlsJson, location, contact_phone]
    );

    return {
      id: result.insertId,
      user_id,
      type,
      title,
      description,
      animal_type,
      breed,
      age,
      price,
      image_urls,
      location,
      contact_phone,
      status: 'active'
    };
  } catch (error) {
    console.error('Model error - createAnnouncement:', error);
    throw error;
  }
};

/**
 * Mettre à jour une annonce
 */
const updateAnnouncement = async (id, announcementData) => {
  try {
    const updates = [];
    const params = [];

    // Construire dynamiquement la requête UPDATE
    if (announcementData.title !== undefined) {
      updates.push('title = ?');
      params.push(announcementData.title);
    }
    if (announcementData.description !== undefined) {
      updates.push('description = ?');
      params.push(announcementData.description);
    }
    if (announcementData.animal_type !== undefined) {
      updates.push('animal_type = ?');
      params.push(announcementData.animal_type);
    }
    if (announcementData.breed !== undefined) {
      updates.push('breed = ?');
      params.push(announcementData.breed);
    }
    if (announcementData.age !== undefined) {
      updates.push('age = ?');
      params.push(announcementData.age);
    }
    if (announcementData.price !== undefined) {
      updates.push('price = ?');
      params.push(announcementData.price);
    }
    if (announcementData.image_urls !== undefined) {
      updates.push('image_urls = ?');
      params.push(JSON.stringify(announcementData.image_urls));
    }
    if (announcementData.location !== undefined) {
      updates.push('location = ?');
      params.push(announcementData.location);
    }
    if (announcementData.contact_phone !== undefined) {
      updates.push('contact_phone = ?');
      params.push(announcementData.contact_phone);
    }
    if (announcementData.status !== undefined) {
      updates.push('status = ?');
      params.push(announcementData.status);
    }

    if (updates.length === 0) {
      throw new Error('Aucune donnée à mettre à jour');
    }

    params.push(id);

    await query(
      `UPDATE announcements SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    return true;
  } catch (error) {
    console.error('Model error - updateAnnouncement:', error);
    throw error;
  }
};

/**
 * Supprimer une annonce
 */
const deleteAnnouncement = async (id) => {
  try {
    await query('DELETE FROM announcements WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Model error - deleteAnnouncement:', error);
    throw error;
  }
};

/**
 * Vérifier si un utilisateur est propriétaire d'une annonce
 */
const isAnnouncementOwner = async (announcementId, userId) => {
  try {
    const announcements = await query(
      'SELECT user_id FROM announcements WHERE id = ?',
      [announcementId]
    );

    if (announcements.length === 0) {
      return false;
    }

    return announcements[0].user_id === userId;
  } catch (error) {
    console.error('Model error - isAnnouncementOwner:', error);
    throw error;
  }
};

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
  getUserAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  isAnnouncementOwner
};