import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../auth/LoginScreen'; // ✅ Import LoginScreen

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  // ✅ Recharger les données quand on revient sur l'écran
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

  // ✅ Si pas connecté, afficher directement le LoginScreen
  if (!isLoggedIn) {
    return <LoginScreen navigation={navigation} />;
  }

  // ✅ Si connecté, afficher le profil
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="edit" size={24} color="#1F5C40" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageContainer}>
        
          <TouchableOpacity style={styles.cameraButton}>
            <Icon name="camera" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>
          {userData?.firstName} {userData?.lastName}
        </Text>
        <Text style={styles.userEmail}>{userData?.email}</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Icon name="user" size={22} color="#1F5C40" />
            <Text style={styles.menuText}>Edit Profile</Text>
            <Icon name="chevron-right" size={22} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('MyAnnouncements')}
          >
            <Icon name="heart" size={22} color="#1F5C40" />
            <Text style={styles.menuText}>My Announcements</Text>
            <Icon name="chevron-right" size={22} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Icon name="lock" size={22} color="#1F5C40" />
            <Text style={styles.menuText}>Change Password</Text>
            <Icon name="chevron-right" size={22} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Icon name="log-out" size={22} color="#FF0000" />
            <Text style={[styles.menuText, { color: '#FF0000' }]}>Logout</Text>
            <Icon name="chevron-right" size={22} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F5C40',
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#E97A3A',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E97A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F5C40',
    textAlign: 'center',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
  },
});