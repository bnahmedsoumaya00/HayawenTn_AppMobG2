import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔥 Votre IP
const API_BASE_URL = 'http://192.168.1.8:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // ← Augmentez à 30 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter le token automatiquement
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('📡 API Request:', config.method.toUpperCase(), config.url);
    } catch (error) {
      console.error('❌ Error getting token:', error);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Gérer les réponses et erreurs
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  async (error) => {
    console.error('❌ API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('userToken');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };