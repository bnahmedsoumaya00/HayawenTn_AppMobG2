import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    name: 'Tesnime Ben',
    phone: '+216 22 222 222',
    email: 'tesnime@gmail.com',
    avatar: null,
  });

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: () => {
            // TODO: Nettoyer les données utilisateur
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="settings" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            )}
          </View>
          <View style={styles.activeIndicator} />
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Name</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <View style={styles.editButton}>
                <Icon name="edit-2" size={16} color="#1F5C40" />
                <Text style={styles.editText}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>{user.name}</Text>
          </View>
        </View>

        {/* Phone Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
        </View>

        {/* Email Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
        </View>

        {/* Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Password</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>************</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* My Announcements Button */}
        <TouchableOpacity
          style={styles.announcementsButton}
          onPress={() => navigation.navigate('MyAnnouncements')}
        >
          <Icon name="file-text" size={20} color="#1F5C40" />
          <Text style={styles.announcementsButtonText}>Mes Annonces</Text>
          <Icon name="chevron-right" size={20} color="#1F5C40" />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>

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
  header: {
    backgroundColor: '#1F5C40',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: -30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 26,
    backgroundColor: '#4B8B6D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  activeIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#50CD89',
    position: 'absolute',
    bottom: 5,
    right: '40%',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1F5C40',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  editText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F5C40',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2.208,
    borderColor: '#F7F8F8',
    borderRadius: 14.91,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#4B8B6D',
  },
  changePasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F5C40',
    textAlign: 'right',
    marginTop: 8,
  },
  announcementsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14.91,
    borderWidth: 2,
    borderColor: '#1F5C40',
    marginBottom: 20,
  },
  announcementsButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F5C40',
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E97A3A',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
    gap: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});