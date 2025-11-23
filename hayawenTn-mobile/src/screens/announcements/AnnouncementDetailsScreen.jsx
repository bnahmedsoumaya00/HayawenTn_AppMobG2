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

export default function AnnouncementDetailScreen({ route, navigation }) {
  const { animal } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#1F5C40" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>annonce</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image principale */}
        <View style={styles.imageContainer}>
          <Image source={animal.image} style={styles.animalImage} resizeMode="cover" />
          
          {/* Bouton favori */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Icon
              name={isFavorite ? "heart" : "heart"}
              size={24}
              color={isFavorite ? "#FF0000" : "#E97A3A"}
            />
          </TouchableOpacity>
        </View>

        {/* Informations de l'animal */}
        <View style={styles.infoContainer}>
          <Text style={styles.animalName}>{animal.name}</Text>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Icon name="calendar" size={14} color="#1F5C40" />
              <Text style={styles.badgeText}>{animal.age}</Text>
            </View>
            <View style={styles.badge}>
              <Icon name="users" size={14} color="#1F5C40" />
              <Text style={styles.badgeText}>{animal.gender}</Text>
            </View>
            <View style={styles.badge}>
              <Icon name="map-pin" size={14} color="#1F5C40" />
              <Text style={styles.badgeText}>{animal.location}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{animal.description}</Text>
          </View>

          {/* Informations du propriétaire */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Owner</Text>
            
            <View style={styles.contactRow}>
              <Icon name="user" size={16} color="#E97A3A" />
              <Text style={styles.contactText}>{animal.owner}</Text>
            </View>

            <View style={styles.contactRow}>
              <Icon name="phone" size={16} color="#E97A3A" />
              <Text style={styles.contactText}>{animal.phone}</Text>
            </View>

            <View style={styles.contactRow}>
              <Icon name="map-pin" size={16} color="#E97A3A" />
              <Text style={styles.contactText}>{animal.address}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bouton Prix / Contact */}
      <TouchableOpacity style={styles.priceButton}>
        <Text style={styles.priceText}>{animal.price}</Text>
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
    overflow: 'hidden',
    height: 350,
    position: 'relative',
  },
  animalImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  animalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F5C40',
    marginBottom: 15,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F5C40',
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
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
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