import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Inscription
export const register = async (userData) => {
  try {
    console.log('Register:', userData);
    const response = await apiClient.post('/auth/register', userData);
    
    if (response.data.token) {
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Connexion
export const login = async (credentials) => {
  try {
    console.log('Login:', credentials);
    const response = await apiClient.post('/auth/login', credentials);
    
    if (response.data.token) {
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Déconnexion
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Obtenir l'utilisateur actuel
export const getCurrentUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return !!token;
  } catch (error) {
    return false;
  }
};