import apiClient from './apiClient';

// Obtenir tous les favoris
export const getFavorites = async () => {
  try {
    const response = await apiClient.get('/favorites');
    return response.data;
  } catch (error) {
    console.error('Get favorites error:', error);
    throw error.response?.data || { message: 'Failed to fetch favorites' };
  }
};

// Ajouter aux favoris
export const addToFavorites = async (itemId, itemType) => {
  try {
    const response = await apiClient.post('/favorites', { itemId, itemType });
    return response.data;
  } catch (error) {
    console.error('Add to favorites error:', error);
    throw error.response?.data || { message: 'Failed to add to favorites' };
  }
};

// Retirer des favoris
export const removeFromFavorites = async (favoriteId) => {
  try {
    const response = await apiClient.delete(`/favorites/${favoriteId}`);
    return response.data;
  } catch (error) {
    console.error('Remove from favorites error:', error);
    throw error.response?.data || { message: 'Failed to remove from favorites' };
  }
};

// Vérifier si un élément est en favori
export const isFavorite = async (itemId, itemType) => {
  try {
    const response = await apiClient.get(`/favorites/check?itemId=${itemId}&itemType=${itemType}`);
    return response.data;
  } catch (error) {
    console.error('Check favorite error:', error);
    return { isFavorite: false };
  }
};