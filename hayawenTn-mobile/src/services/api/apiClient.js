import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔥 IMPORTANT : Remplacez 192.168.1.15 par VOTRE adresse IP
const API_BASE_URL = 'http://192.168.225.11/api';

// Créer une instance Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token automatiquement
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      await AsyncStorage.removeItem('userToken');
      // Rediriger vers login si nécessaire
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };