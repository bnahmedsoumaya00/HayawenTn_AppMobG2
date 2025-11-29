import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../services/api/apiClient';

export default function AddAnnouncementScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Formulaire
  const [formData, setFormData] = useState({
    title: '',
    category: 'Dogs',
    age: '',
    gender: 'Male',
    location: '',
    price: '',
    description: '',
    phone: '',
    address: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setShowLoginModal(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error checking login:', error);
      setShowLoginModal(true);
      setLoading(false);
    }
  };
const handleSubmit = async () => {
  // Validation
  if (!formData.name || !formData.age || !formData.location) {
    Alert.alert('Error', 'Please fill all required fields');
    return;
  }

  try {
    setLoading(true);

    // Récupérer l'ID de l'utilisateur
    const userDataString = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    // Préparer les données
    const announcementData = {
      title: formData.name,
      description: formData.description || `${formData.category} - ${formData.gender} - ${formData.age}`,
      animal_type: formData.category.toLowerCase(),
      animal_name: formData.name,
      age: formData.age,
      price: formData.price || '0',
      location: formData.location,
      contact_phone: formData.phone,
      type: formData.price === '0' || !formData.price ? 'adoption' : 'sale',
      breed: formData.gender,
      status: 'active',
    };

    console.log('Sending announcement:', announcementData);

    // Envoyer à l'API
    const response = await apiClient.post('/announcements', announcementData);

    if (response.data.success) {
      Alert.alert('Success', 'Your announcement has been posted!', [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('MyAnnouncements')
        }
      ]);
    }
  } catch (error) {
    console.error('Submit error:', error);
    Alert.alert('Error', error.response?.data?.message || 'Failed to create announcement');
  } finally {
    setLoading(false);
  }
};
  return (
    <View style={styles.container}>
      {/* Modal de connexion requise */}
      <Modal
        visible={showLoginModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLoginModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon name="alert-circle" size={50} color="#E97A3A" />
            <Text style={styles.modalTitle}>Login Required</Text>
            <Text style={styles.modalText}>
              You need to login to add an announcement
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowLoginModal(false);
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.modalButtonText}>Go to Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => {
                setShowLoginModal(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Formulaire d'ajout (visible uniquement si connecté) */}
      {isLoggedIn && (
        <>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={28} color="#1F5C40" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add your animal</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Upload Image */}
            <TouchableOpacity style={styles.imageUpload}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Icon name="camera" size={40} color="#999" />
                  <Text style={styles.uploadText}>Upload Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.formContainer}>
              {/* Nom */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter animal name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>

              {/* Catégorie */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.radioGroup}>
                  {['Dogs', 'Cats', 'Birds', 'Fish'].map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={styles.radioButton}
                      onPress={() => setFormData({ ...formData, category: cat })}
                    >
                      <View style={[
                        styles.radioCircle,
                        formData.category === cat && styles.radioCircleSelected
                      ]} />
                      <Text style={styles.radioLabel}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Genre */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.radioGroup}>
                  {['Male', 'Female'].map((gen) => (
                    <TouchableOpacity
                      key={gen}
                      style={styles.radioButton}
                      onPress={() => setFormData({ ...formData, gender: gen })}
                    >
                      <View style={[
                        styles.radioCircle,
                        formData.gender === gen && styles.radioCircleSelected
                      ]} />
                      <Text style={styles.radioLabel}>{gen}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Âge */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 2 years"
                  value={formData.age}
                  onChangeText={(text) => setFormData({ ...formData, age: text })}
                />
              </View>

              {/* Localisation */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                />
              </View>

              {/* Prix */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 500 DT"
                  value={formData.price}
                  onChangeText={(text) => setFormData({ ...formData, price: text })}
                  keyboardType="numeric"
                />
              </View>

              {/* Téléphone */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+216 XX XXX XXX"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  keyboardType="phone-pad"
                />
              </View>

              {/* Adresse */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full address"
                  value={formData.address}
                  onChangeText={(text) => setFormData({ ...formData, address: text })}
                />
              </View>

              {/* Description */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe your animal..."
                  value={formData.description}
                  onChangeText={(text) => setFormData({ ...formData, description: text })}
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Bouton Submit */}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>POST</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 50 }} />
          </ScrollView>
        </>
      )}
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
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F5C40',
  },
  imageUpload: {
    height: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F5C40',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1F5C40',
    marginRight: 8,
  },
  radioCircleSelected: {
    backgroundColor: '#E97A3A',
    borderColor: '#E97A3A',
  },
  radioLabel: {
    fontSize: 14,
    color: '#1F5C40',
  },
  submitButton: {
    backgroundColor: '#E97A3A',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F5C40',
    marginTop: 15,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: '#E97A3A',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalCancelButton: {
    paddingVertical: 12,
  },
  modalCancelText: {
    fontSize: 14,
    color: '#666',
  },
});