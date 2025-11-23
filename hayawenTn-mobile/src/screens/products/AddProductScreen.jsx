import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function AddProductScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dress',
    animalType: 'dog',
    price: '',
    description: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['Dress', 'Food', 'Potion', 'Sac', 'Toy'];
  const animalTypes = ['dog', 'cat'];

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    Alert.alert('Success', 'Your product has been added!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#1F5C40" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
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
            <Text style={styles.label}>Product Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter product name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          {/* Catégorie */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    formData.category === cat && styles.categoryButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, category: cat })}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    formData.category === cat && styles.categoryButtonTextActive
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Type d'animal */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Animal Type *</Text>
            <View style={styles.radioGroup}>
              {animalTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.radioButton}
                  onPress={() => setFormData({ ...formData, animalType: type })}
                >
                  <View style={[
                    styles.radioCircle,
                    formData.animalType === type && styles.radioCircleSelected
                  ]} />
                  <Text style={styles.radioLabel}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Prix */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (DT) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 50"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              keyboardType="numeric"
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your product..."
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Bouton Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>ADD PRODUCT</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 50 }} />
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
  categoryButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryButtonActive: {
    backgroundColor: '#E97A3A',
    borderColor: '#E97A3A',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
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
});