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

export default function AnnouncementsScreen({ navigation }) {
  const announcements = [
    {
      id: 1,
      title: 'Featured Pet of the Week',
      description: 'Say hello to Buddy, a playful golden retriever looking for a loving home! 🐕',
      image: require('../../assets/images/pet1.png'),
      badges: ['Dog', 'Golden', '2 years'],
    },
    {
      id: 2,
      title: 'Featured Pet of the Week',
      description: 'Say hello to Buddy, a playful golden retriever looking for a loving home! 🐕',
      image: require('../../assets/images/pet2.png'),
      badges: ['Cat', 'Persian', '1 year'],
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

        <Text style={styles.subtitle}>Hi, Discover posts...</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {/* Banner Vaccination */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.arrowLeft}>
            <Icon name="chevron-left" size={20} color="#000" />
          </TouchableOpacity>
          
          <Image
            source={require('../../assets/images/banner-vaccin.png')}
            style={styles.banner}
            resizeMode="cover"
          />

          <TouchableOpacity style={styles.arrowRight}>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Announcements List */}
        {announcements.map((item) => (
          <AnnouncementCard key={item.id} item={item} navigation={navigation} />
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateAnnouncement')}
      >
        <Icon name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

// Composant Card Annonce
function AnnouncementCard({ item, navigation }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
       
        <Text style={styles.cardTitle}>{item.title}</Text>
     
      </View>

      <View style={styles.cardContent}>
        <Image source={item.image} style={styles.cardImage} />
        
        <View style={styles.cardInfo}>
          <View style={styles.badgesContainer}>
            {item.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('AnnouncementDetails', { item })}
          >
            <Text style={styles.detailsButtonText}>Voir détails</Text>
            <Icon name="chevron-right" size={16} color="#1F5C40" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.likeButton}>
        <Icon name="heart" size={20} color="#FF0000" />
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
  arrowLeft: {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  arrowRight: {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  banner: {
    flex: 1,
    height: 140,
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#F8F5F5',
    borderWidth: 1,
    borderColor: '#1F5C40',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#000',
  },
  cardContent: {
    flexDirection: 'row',
    gap: 15,
  },
  cardImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#F1E6D5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 8,
    fontFamily: 'Roboto-Bold',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  description: {
    fontSize: 11,
    fontFamily: 'Roboto-Bold',
    color: '#575656',
    lineHeight: 16,
    marginBottom: 10,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 5,
  },
  detailsButtonText: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: '#1F5C40',
  },
  likeButton: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 35,
    height: 35,
    backgroundColor: '#F8F5F5',
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E97A3A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});