import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function VeterinariansScreen({ navigation }) {
  const veterinarians = [
    {
      id: 1,
      name: 'Animalus Clinique Vétérinaire ENNASR',
      image: require('../../assets/images/vet1.png'),
      phone: '+216 71 754 013',
      address: '15 Rue sod maarab, Ariana 2037',
      hours: 'Monday - Sunday : 8:00am - 8:00pm',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Dr.Mourad ben rjab',
      image: require('../../assets/images/vet2.png'),
      phone: '+216 55 122 477',
      address: 'R3XQ+329, Rue Fadhel Ben Achour, Kélibia',
      hours: 'Monday - Sunday : 9:00am - 12:00pm and 3:00pm - 6:00pm',
      rating: 4.8,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>HayaWenTN</Text>
          <TouchableOpacity>
            <Icon name="logo-header" size={24} color="#1F5C40" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Hi, Discover the veterinarians...</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.arrowLeft}>
            <Icon name="chevron-left" size={20}  />
          </TouchableOpacity>
          
          <Image
            source={require('../../assets/images/banner-vaccin.png')}
            style={styles.banner}
            resizeMode="cover"
          />

          <TouchableOpacity style={styles.arrowRight}>
            <Icon name="chevron-right" size={20}  />
          </TouchableOpacity>
        </View>

        {/* Veterinarians List */}
        {veterinarians.map((vet) => (
          <VetCard
            key={vet.id}
            vet={vet}
            onPress={() => navigation.navigate('VetDetails', { vet })}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

// Composant VetCard
function VetCard({ vet, onPress }) {
  return (
    <TouchableOpacity style={styles.vetCard} onPress={onPress}>
      {/* Avatar */}
      <Image source={vet.image} style={styles.vetAvatar} />

      {/* Info */}
      <View style={styles.vetInfo}>
        {/* Name */}
        <Text style={styles.vetName}>{vet.name}</Text>

       

        {/* Phone & WhatsApp */}
        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Icon name="phone" size={16} color="#1F5C40" />
            <Text style={styles.contactText}>{vet.phone}</Text>
          </View>
          <TouchableOpacity style={styles.whatsappButton}>
            <Image
              source={require('../../assets/icons/phone.png')}
              style={styles.whatsappIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Hours */}
        <View style={styles.infoRow}>
          <Icon name="clock" size={14} color="rgba(0, 0, 0, 0.65)" />
          <Text style={styles.infoText}>{vet.hours}</Text>
        </View>

        {/* Address */}
        <View style={styles.infoRow}>
          <Icon name="map-pin" size={14} color="rgba(0, 0, 0, 0.65)" />
          <Text style={[styles.infoText, styles.addressText]}>
            {vet.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    paddingBottom: 10,
  },
  logo: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F5C40',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 25,
  },
 
  banner: {
    flex: 1,
    height: 140,
    borderRadius: 12,
  },
  vetCard: {
    backgroundColor: '#F8F5F5',
    borderWidth: 1,
    borderColor: '#1F5C40',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    flexDirection: 'row',
  },
  vetAvatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  vetInfo: {
    flex: 1,
  },
  vetName: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#000',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#000',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contactText: {
    fontSize: 10,
    fontFamily: 'Roboto-Bold',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  whatsappButton: {
    width: 30,
    height: 30,
    backgroundColor: '#25D366',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whatsappIcon: {
    width: 18,
    height: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 5,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0, 0, 0, 0.65)',
    flex: 1,
  },
  addressText: {
    textDecorationLine: 'underline',
  },
});