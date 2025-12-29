import apiClient from './apiClient';

// Obtenir tous les vétérinaires
export const getVeterinarians = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`/veterinarians?${params}`);
    return response.data;
  } catch (error) {
    console.error('Get veterinarians error:', error);
    throw error.response?.data || { message: 'Failed to fetch veterinarians' };
  }
};

// Obtenir un vétérinaire par ID
export const getVeterinarianById = async (id) => {
  try {
    const response = await apiClient.get(`/veterinarians/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get veterinarian error:', error);
    throw error.response?.data || { message: 'Failed to fetch veterinarian' };
  }
};

// Rechercher des vétérinaires
export const searchVeterinarians = async (searchTerm) => {
  try {
    const response = await apiClient.get(`/veterinarians/search?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('Search veterinarians error:', error);
    throw error.response?.data || { message: 'Failed to search veterinarians' };
  }
};