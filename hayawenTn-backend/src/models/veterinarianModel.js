// src/models/veterinarianModel.js - Model pour les vétérinaires
const { query } = require('../config/database');

/**
 * Récupérer tous les vétérinaires avec filtres
 */
const getAllVeterinarians = async (filters = {}) => {
  try {
    const {
      specialty = '',
      governorate = '',
      search = ''
    } = filters;

    // Construire la requête SQL dynamiquement
    let sql = 'SELECT * FROM veterinarians WHERE 1=1';
    const params = [];

    // Filtre par spécialité
    if (specialty) {
      sql += ' AND specialty LIKE ?';
      params.push(`%${specialty}%`);
    }

    // Filtre par gouvernorat
    if (governorate) {
      sql += ' AND governorate LIKE ?';
      params.push(`%${governorate}%`);
    }

    // Filtre de recherche (nom, clinic, spécialité)
    if (search) {
      sql += ' AND (name LIKE ? OR clinic_name LIKE ? OR specialty LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Trier par nom
    sql += ' ORDER BY name ASC';

    // Exécuter la requête
    const veterinarians = await query(sql, params);

    return veterinarians;
  } catch (error) {
    console.error('Model error - getAllVeterinarians:', error);
    throw error;
  }
};

/**
 * Récupérer un vétérinaire par ID
 */
const getVeterinarianById = async (id) => {
  try {
    const veterinarians = await query(
      'SELECT * FROM veterinarians WHERE id = ?',
      [id]
    );

    if (veterinarians.length === 0) {
      return null;
    }

    return veterinarians[0];
  } catch (error) {
    console.error('Model error - getVeterinarianById:', error);
    throw error;
  }
};

/**
 * Créer un nouveau vétérinaire (Admin uniquement)
 */
const createVeterinarian = async (vetData) => {
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
    } = vetData;

    const result = await query(
      `INSERT INTO veterinarians 
       (name, specialty, clinic_name, address, phone, email, photo_url, working_hours, governorate) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, specialty, clinic_name, address, phone, email, photo_url, working_hours, governorate]
    );

    return {
      id: result.insertId,
      name,
      specialty,
      clinic_name,
      address,
      phone,
      email,
      photo_url,
      working_hours,
      governorate
    };
  } catch (error) {
    console.error('Model error - createVeterinarian:', error);
    throw error;
  }
};

/**
 * Mettre à jour un vétérinaire (Admin uniquement)
 */
const updateVeterinarian = async (id, vetData) => {
  try {
    const updates = [];
    const params = [];

    // Construire dynamiquement la requête UPDATE
    if (vetData.name !== undefined) {
      updates.push('name = ?');
      params.push(vetData.name);
    }
    if (vetData.specialty !== undefined) {
      updates.push('specialty = ?');
      params.push(vetData.specialty);
    }
    if (vetData.clinic_name !== undefined) {
      updates.push('clinic_name = ?');
      params.push(vetData.clinic_name);
    }
    if (vetData.address !== undefined) {
      updates.push('address = ?');
      params.push(vetData.address);
    }
    if (vetData.phone !== undefined) {
      updates.push('phone = ?');
      params.push(vetData.phone);
    }
    if (vetData.email !== undefined) {
      updates.push('email = ?');
      params.push(vetData.email);
    }
    if (vetData.photo_url !== undefined) {
      updates.push('photo_url = ?');
      params.push(vetData.photo_url);
    }
    if (vetData.working_hours !== undefined) {
      updates.push('working_hours = ?');
      params.push(vetData.working_hours);
    }
    if (vetData.governorate !== undefined) {
      updates.push('governorate = ?');
      params.push(vetData.governorate);
    }

    if (updates.length === 0) {
      throw new Error('Aucune donnée à mettre à jour');
    }

    params.push(id);

    await query(
      `UPDATE veterinarians SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    return true;
  } catch (error) {
    console.error('Model error - updateVeterinarian:', error);
    throw error;
  }
};

/**
 * Supprimer un vétérinaire (Admin uniquement)
 */
const deleteVeterinarian = async (id) => {
  try {
    await query('DELETE FROM veterinarians WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Model error - deleteVeterinarian:', error);
    throw error;
  }
};

/**
 * Récupérer toutes les spécialités (pour les filtres)
 */
const getAllSpecialties = async () => {
  try {
    const specialties = await query(
      'SELECT DISTINCT specialty FROM veterinarians WHERE specialty IS NOT NULL ORDER BY specialty ASC'
    );
    
    return specialties.map(row => row.specialty);
  } catch (error) {
    console.error('Model error - getAllSpecialties:', error);
    throw error;
  }
};

/**
 * Récupérer tous les gouvernorats (pour les filtres)
 */
const getAllGovernorates = async () => {
  try {
    const governorates = await query(
      'SELECT DISTINCT governorate FROM veterinarians WHERE governorate IS NOT NULL ORDER BY governorate ASC'
    );
    
    return governorates.map(row => row.governorate);
  } catch (error) {
    console.error('Model error - getAllGovernorates:', error);
    throw error;
  }
};

module.exports = {
  getAllVeterinarians,
  getVeterinarianById,
  createVeterinarian,
  updateVeterinarian,
  deleteVeterinarian,
  getAllSpecialties,
  getAllGovernorates
};