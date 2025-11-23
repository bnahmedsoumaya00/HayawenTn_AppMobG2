import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#1F5C40" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>detail accecoir</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.productImage} resizeMode="contain" />
          
          {product.colors && product.colors.length > 0 && (
            <View style={styles.colorsColumn}>
              {product.colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.favoriteButton}>
            <Icon name="heart" size={24} color="#E97A3A" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>Sac</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
            {product.colors && product.colors.length > 0 && (
              <Text style={styles.description}>Disponible en plusieurs couleurs.</Text>
            )}
          </View>

          <View style={styles.contactSection}>
            <View style={styles.contactRow}>
              <Icon name="map-pin" size={16} color="#E97A3A" />
              <Text style={styles.contactText}>13 Rue xod nouveli, Ariana 2037</Text>
            </View>
            <View style={styles.contactRow}>
              <Icon name="phone" size={16} color="#E97A3A" />
              <Text style={styles.contactText}>+216 12 345 678</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.priceButton}>
        <Text style={styles.priceText}>{product.price}</Text>
      </TouchableOpacity>
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
  imageContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: 250,
    height: 250,
  },
  colorsColumn: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -60 }],
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: '#E97A3A',
    borderWidth: 3,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE4D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F5C40',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F5C40',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  contactSection: {
    marginTop: 10,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  priceButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#E97A3A',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});