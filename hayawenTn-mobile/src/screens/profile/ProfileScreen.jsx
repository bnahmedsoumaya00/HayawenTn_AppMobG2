import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../auth/LoginScreen';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userDataString = await AsyncStorage.getItem('userData');

      if (!token || !userDataString) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      const user = JSON.parse(userDataString);
      setUserData(user);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setIsLoggedIn(false);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            setIsLoggedIn(false);
            setUserData(null);
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E97A3A" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen navigation={navigation} />;
  }

  // Obtenir l'initiale pour l'avatar
  const getInitials = () => {
    if (userData?.displayName) {
      return userData.displayName.charAt(0).toUpperCase();
    }
    if (userData?.email) {
      return userData.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <View style={styles.container}>
      {/* Header avec dégradé */}
      <View style={styles.headerGradient}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="edit-3" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Avatar Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials()}</Text>
            </View>
            <View style={styles.statusDot} />
          </View>
          
          <Text style={styles.userName}>{userData?.displayName || 'User'}</Text>
          <Text style={styles.userEmail}>{userData?.email}</Text>
          
          {userData?.phone && (
            <View style={styles.phoneContainer}>
              <Icon name="phone" size={16} color="#4B8B6D" />
              <Text style={styles.userPhone}>{userData.phone}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.menuIconContainer}>
              <Icon name="user" size={22} color="#1F5C40" />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Icon name="chevron-right" size={22} color="#8A96BC" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('MyAnnouncements')}
          >
            <View style={styles.menuIconContainer}>
              <Icon name="file-text" size={22} color="#1F5C40" />
            </View>
            <Text style={styles.menuText}>My Announcements</Text>
            <Icon name="chevron-right" size={22} color="#8A96BC" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={styles.menuIconContainer}>
              <Icon name="lock" size={22} color="#1F5C40" />
            </View>
            <Text style={styles.menuText}>Change Password</Text>
            <Icon name="chevron-right" size={22} color="#8A96BC" />
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>More</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="bell" size={22} color="#1F5C40" />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <Icon name="chevron-right" size={22} color="#8A96BC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="help-circle" size={22} color="#1F5C40" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Icon name="chevron-right" size={22} color="#8A96BC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]} 
            onPress={handleLogout}
          >
            <View style={[styles.menuIconContainer, styles.logoutIconContainer]}>
              <Icon name="log-out" size={22} color="#FF3B30" />
            </View>
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            <Icon name="chevron-right" size={22} color="#8A96BC" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E6D5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1E6D5',
  },
  headerGradient: {
    backgroundColor: '#1F5C40',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4B8B6D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusDot: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#D0E8DF',
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  userPhone: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F5C40',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1E6D5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  logoutItem: {
    marginTop: 20,
    borderColor: '#FFE5E5',
    borderWidth: 1,
  },
  logoutIconContainer: {
    backgroundColor: '#FFE5E5',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
});