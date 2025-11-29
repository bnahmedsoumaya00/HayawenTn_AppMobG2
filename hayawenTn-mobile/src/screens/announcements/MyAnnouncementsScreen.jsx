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
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../services/api/apiClient';

export default function MyAnnouncementsScreen({ navigation }) {
  const [myAnnouncements, setMyAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadUserIdAndAnnouncements();
  }, []);

  // Recharger quand on revient sur l'écran
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserIdAndAnnouncements();
    });
    return unsubscribe;
  }, [navigation]);

  const loadUserIdAndAnnouncements = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserId(userData.id);
        await fetchMyAnnouncements(userData.id);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setLoading(false);
    }
  };

  const fetchMyAnnouncements = async (uid) => {
    try {
      setLoading(true);
      // Récupérer toutes les annonces
      const response = await apiClient.get('/announcements');
      
      if (response.data.success) {
        // Filtrer pour avoir seulement celles de l'utilisateur connecté
        const userAnnouncements = response.data.data.filter(
          ann => ann.user_id === uid
        );
        setMyAnnouncements(userAnnouncements);
      }
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (userId) {
      fetchMyAnnouncements(userId);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this announcement?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiClient.delete(`/announcements/${id}`);
              Alert.alert('Success', 'Announcement deleted successfully');
              // Recharger la liste
              if (userId) {
                fetchMyAnnouncements(userId);
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete announcement');
            }
          },
        },
      ]
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E97A3A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Announcements</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddAnnouncement')}>
          <Icon name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {myAnnouncements.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="file-text" size={80} color="#D0D0D0" />
            <Text style={styles.emptyTitle}>No announcements yet</Text>
            <Text style={styles.emptyText}>
              Create your first announcement to get started
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddAnnouncement')}
            >
              <Icon name="plus" size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Create Announcement</Text>
            </TouchableOpacity>
          </View>
        ) : (
          myAnnouncements.map((announcement) => (
            <View key={announcement.id} style={styles.card}>
              {announcement.image_urls && (
                <Image 
                  source={{ uri: announcement.image_urls }} 
                  style={styles.cardImage}
                />
              )}
              
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{announcement.title}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: announcement.status === 'active' ? '#4CAF50' : '#999' }
                  ]}>
                    <Text style={styles.statusText}>
                      {announcement.type || announcement.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardPrice}>
                  {announcement.price ? `${announcement.price} DT` : 'Free'}
                </Text>
                
                {announcement.location && (
                  <View style={styles.locationContainer}>
                    <Icon name="map-pin" size={14} color="#666" />
                    <Text style={styles.cardLocation}>{announcement.location}</Text>
                  </View>
                )}

                <Text style={styles.cardDate}>
                  {new Date(announcement.created_at).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditAnnouncement', { announcement })}
                  >
                    <Icon name="edit-2" size={18} color="#1F5C40" />
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(announcement.id)}
                  >
                    <Icon name="trash-2" size={18} color="#FF3B30" />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
        
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
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F5C40',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#E97A3A',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    gap: 10,
    shadowColor: '#E97A3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E97A3A',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  cardLocation: {
    fontSize: 14,
    color: '#666',
  },
  cardDate: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1E6D5',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  editButtonText: {
    color: '#1F5C40',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 15,
    fontWeight: '600',
  },
});