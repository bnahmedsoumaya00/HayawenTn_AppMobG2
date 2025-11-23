import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function VeterinariansScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const veterinarians = [
    {
      id: 1,
      name: 'Animalus Clinique Vétérinaire ENNASR',
      image: require('../../assets/images/vet1.png'),
      phone: '+216 71 754 013',
      email: 'animalus.clinique.veterinaire@gmail.com',
      address: '15 Rue sod maarab, Ariana 2037',
      city: 'Ariana',
      hours: 'Ouvert 7 jours sur 7-Disponible 24h/24',
      latitude: 36.8665,
      longitude: 10.1955,
      services: ['Vétérinaire généraliste', 'Laboratoire d\'analyses', 'Radiologie', 'Échographie'],
    },
    {
      id: 2,
      name: 'Dr. Mourad Ben Rjab',
      image: require('../../assets/images/vet2.png'),
      phone: '+216 55 122 477',
      email: 'mourad.benrjab@veterinaire.tn',
      address: 'Rue Fadhel Ben Achour, Kélibia',
      city: 'Kélibia',
      hours: 'Lun-Dim: 9h-12h et 15h-18h',
      latitude: 36.8469,
      longitude: 11.0937,
      services: ['Consultation', 'Vaccination', 'Chirurgie'],
    },
    {
      id: 3,
      name: 'Clinique Vétérinaire de Tunis',
      image: require('../../assets/images/vet3.png'),
      phone: '+216 71 123 456',
      email: 'contact@vet-tunis.tn',
      address: 'Avenue Habib Bourguiba, Tunis',
      city: 'Tunis',
      hours: 'Ouvert 24h/24 - Urgences',
      latitude: 36.8065,
      longitude: 10.1815,
      services: ['Urgences', 'Hospitalisation', 'Analyses', 'Chirurgie'],
    },
    {
      id: 4,
      name: 'Cabinet Vétérinaire Sousse',
      image: require('../../assets/images/vet4.png'),
      phone: '+216 73 456 789',
      email: 'vet.sousse@gmail.com',
      address: 'Rue de la République, Sousse',
      city: 'Sousse',
      hours: 'Lun-Sam: 8h-19h',
      latitude: 35.8256,
      longitude: 10.6369,
      services: ['Consultation', 'Vaccination', 'Stérilisation'],
    },
    {
      id: 5,
      name: 'Clinique Animalière Sfax',
      image: require('../../assets/images/vet5.png'),
      phone: '+216 74 987 654',
      email: 'clinique.sfax@veterinaire.tn',
      address: 'Rue Mongi Slim, Sfax',
      city: 'Sfax',
      hours: 'Lun-Ven: 9h-17h',
      latitude: 34.7406,
      longitude: 10.7603,
      services: ['Consultation', 'Radiologie', 'Analyses'],
    },
    {
      id: 6,
      name: 'Vétérinaire Ben Arous',
      image: require('../../assets/images/vet6.png'),
      phone: '+216 71 369 258',
      email: 'vet.benarous@gmail.com',
      address: 'Avenue Principale, Ben Arous',
      city: 'Ben Arous',
      hours: 'Lun-Dim: 10h-20h',
      latitude: 36.7469,
      longitude: 10.2189,
      services: ['Consultation', 'Urgences', 'Vaccination'],
    },
    {
      id: 7,
      name: 'Cabinet Dr. Ahmed Najar',
      image: require('../../assets/images/vet7.png'),
      phone: '+216 72 147 258',
      email: 'dr.najar@veterinaire.tn',
      address: 'Centre Ville, Bizerte',
      city: 'Bizerte',
      hours: 'Mar-Dim: 9h-18h',
      latitude: 37.2746,
      longitude: 9.8739,
      services: ['Consultation', 'Chirurgie', 'Dentisterie'],
    },
    {
      id: 8,
      name: 'Clinique Vétérinaire Nabeul',
      image: require('../../assets/images/vet8.png'),
      phone: '+216 72 789 456',
      email: 'vet.nabeul@gmail.com',
      address: 'Rue des Fleurs, Nabeul',
      city: 'Nabeul',
      hours: 'Lun-Sam: 8h30-19h30',
      latitude: 36.4516,
      longitude: 10.7361,
      services: ['Consultation', 'Vaccination', 'Analyses'],
    },
    {
      id: 9,
      name: 'Cabinet Vétérinaire La Marsa',
      image: require('../../assets/images/vet9.png'),
      phone: '+216 71 654 321',
      email: 'vet.marsa@veterinaire.tn',
      address: 'Corniche, La Marsa',
      city: 'Ariana',
      hours: 'Lun-Dim: 9h-21h',
      latitude: 36.8783,
      longitude: 10.3247,
      services: ['Consultation', 'Toilettage', 'Vaccination'],
    },
    {
      id: 10,
      name: 'Clinique des Animaux Manouba',
      image: require('../../assets/images/vet10.png'),
      phone: '+216 71 852 963',
      email: 'clinique.manouba@gmail.com',
      address: 'Route Principale, Manouba',
      city: 'Manouba',
      hours: 'Lun-Ven: 8h-18h',
      latitude: 36.8081,
      longitude: 10.0965,
      services: ['Consultation', 'Chirurgie', 'Radiologie'],
    },
  ];

  // ✅ Filtrer par recherche (ville)
  const filteredVeterinarians = veterinarians.filter((vet) =>
    vet.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vet.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Ouvrir Google Maps avec localisation
  const openGoogleMaps = (vet) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${vet.latitude},${vet.longitude}`;
    Linking.openURL(url);
  };

  // ✅ Appeler le vétérinaire
  const callVet = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  // ✅ Envoyer email
  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
                      source={require('../../assets/images/logo-header.png')}
                      style={styles.logo}
                      resizeMode="contain"
                    />
          
        </View>

        <Text style={styles.subtitle}>Hi, Discover the veterinarians...</Text>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by city (e.g., Ariana)"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.arrowButton}>
            <Icon name="chevron-left" size={20} color="#FFF" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/doctor-banner.png')}
            style={styles.banner}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.arrowButton}>
            <Icon name="chevron-right" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Liste des vétérinaires */}
        {filteredVeterinarians.length > 0 ? (
          filteredVeterinarians.map((vet) => (
            <VetCard
              key={vet.id}
              vet={vet}
              onCallPress={() => callVet(vet.phone)}
              onEmailPress={() => sendEmail(vet.email)}
              onMapPress={() => openGoogleMaps(vet)}
            />
          ))
        ) : (
          <Text style={styles.noResults}>No veterinarians found in this area</Text>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

// ✅ Composant VetCard selon le design
function VetCard({ vet, onCallPress, onEmailPress, onMapPress }) {
  return (
    <View style={styles.vetCard}>
      {/* Image du vétérinaire */}
      <View style={styles.vetImageContainer}>
        <Image source={vet.image} style={styles.vetImage} resizeMode="cover" />
      </View>

      {/* Nom */}
      <Text style={styles.vetName}>{vet.name}</Text>

      {/* Services */}
      <View style={styles.servicesContainer}>
        {vet.services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>

      {/* Contact : Email et Téléphone */}
      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.contactButton} onPress={onEmailPress}>
          <Icon name="mail" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.emailText}>{vet.email}</Text>
        <TouchableOpacity style={styles.phoneButton} onPress={onCallPress}>
          <Icon name="phone" size={18} color="#FFF" />
          <Text style={styles.phoneText}>{vet.phone}</Text>
        </TouchableOpacity>
      </View>

      {/* Horaires */}
      <View style={styles.infoRow}>
        <Icon name="calendar" size={18} color="#1F5C40" />
        <Text style={styles.infoText}>{vet.hours}</Text>
      </View>

      {/* Adresse avec lien Google Maps */}
      <TouchableOpacity style={styles.addressRow} onPress={onMapPress}>
        <Icon name="map-pin" size={18} color="#FF0000" />
        <Text style={styles.addressText}>{vet.address}</Text>
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
    paddingBottom: 10,
  },
  logo: {
    width: 150,
    height: 40,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
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
  arrowButton: {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  banner: {
    flex: 1,
    height: 140,
    borderRadius: 12,
  },
  noResults: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  vetCard: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#1F5C40',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
  },
  vetImageContainer: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  vetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#E97A3A',
  },
  vetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F5C40',
    textAlign: 'center',
    marginBottom: 10,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 15,
  },
  serviceItem: {
    backgroundColor: '#F1E6D5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  serviceText: {
    fontSize: 11,
    color: '#1F5C40',
    fontWeight: '500',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  contactButton: {
    width: 40,
    height: 40,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailText: {
    flex: 1,
    fontSize: 11,
    color: '#000',
    marginLeft: 8,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  phoneText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF5F5',
    padding: 10,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 12,
    color: '#1F5C40',
    textDecorationLine: 'underline',
    flex: 1,
  },
});