import apiClient from './apiClient';

// Obtenir toutes les annonces
export const getAnnouncements = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`/announcements?${params}`);
    return response.data;
  } catch (error) {
    console.error('Get announcements error:', error);
    throw error.response?.data || { message: 'Failed to fetch announcements' };
  }
};

// Obtenir une annonce par ID
export const getAnnouncementById = async (id) => {
  try {
    const response = await apiClient.get(`/announcements/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get announcement error:', error);
    throw error.response?.data || { message: 'Failed to fetch announcement' };
  }
};

// Créer une annonce
export const createAnnouncement = async (announcementData) => {
  try {
    const response = await apiClient.post('/announcements', announcementData);
    return response.data;
  } catch (error) {
    console.error('Create announcement error:', error);
    throw error.response?.data || { message: 'Failed to create announcement' };
  }
};

// Mettre à jour une annonce
export const updateAnnouncement = async (id, announcementData) => {
  try {
    const response = await apiClient.put(`/announcements/${id}`, announcementData);
    return response.data;
  } catch (error) {
    console.error('Update announcement error:', error);
    throw error.response?.data || { message: 'Failed to update announcement' };
  }
};

// Supprimer une annonce
export const deleteAnnouncement = async (id) => {
  try {
    const response = await apiClient.delete(`/announcements/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete announcement error:', error);
    throw error.response?.data || { message: 'Failed to delete announcement' };
  }
};

// Mes annonces
export const getMyAnnouncements = async () => {
  try {
    const response = await apiClient.get('/announcements/my');
    return response.data;
  } catch (error) {
    console.error('Get my announcements error:', error);
    throw error.response?.data || { message: 'Failed to fetch my announcements' };
  }
};