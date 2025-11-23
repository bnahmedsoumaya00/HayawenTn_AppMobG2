import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function AnnouncementsScreen({ navigation }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3 images du banner
  const banners = [
    require('../../assets/affiche/banner-animal1.png'),
    require('../../assets/affiche/banner-animal2.png'),
  ];

  // Catégories d'animaux avec icônes PNG
  const categories = [
    { id: 1, name: 'All', icon: require('../../assets/icons/all-animals.png') },
    { id: 2, name: 'Dogs', icon: require('../../assets/icons/dog.png') },
    { id: 3, name: 'Cats', icon: require('../../assets/icons/cat.png') },
    { id: 4, name: 'Birds', icon: require('../../assets/icons/bird.png') },
    { id: 5, name: 'rabbit', icon: require('../../assets/icons/rabbit.png') },
    { id: 6, name: 'chick', icon: require('../../assets/icons/chick.png') },
    { id: 7, name: 'Others', icon: require('../../assets/icons/other.png') },
  ];

  // Annonces d'animaux
  const announcements = [
    {
      id: 1,
      name: 'Goldendoodle',
      category: 'Dogs',
      age: '2 years',
      gender: 'Male',
      location: 'Ariana',
      price: '500 DT',
      image: require('../../assets/animaux/dog1.png'),
      description: 'Adorable Goldendoodle, très affectueux et joueur. Vacciné et en excellente santé. Parfait pour les familles avec enfants.',
      owner: 'Ahmed Ben Ali',
      phone: '+216 12 345 678',
      address: '13 Rue nouvelle, Ariana 2037',
    },
    {
      id: 2,
      name: 'Persian Cat',
      category: 'Cats',
      age: '1 year',
      gender: 'Female',
      location: 'Tunis',
      price: '300 DT',
      image: require('../../assets/animaux/cat1.png'),
      description: 'Magnifique chat persan au caractère doux et calme. Idéal pour appartement.',
      owner: 'Sara Khalil',
      phone: '+216 98 765 432',
      address: 'Avenue Habib Bourguiba, Tunis',
    },
    {
      id: 3,
      name: 'Golden Retriever',
      category: 'Dogs',
      age: '3 years',
      gender: 'Male',
      location: 'Sousse',
      price: '450 DT',
      image: require('../../assets/animaux/dog2.png'),
      description: 'Golden Retriever adorable, très intelligent et obéissant.',
      owner: 'Mohamed Trabelsi',
      phone: '+216 55 123 456',
      address: 'Rue de la République, Sousse',
    },
    {
      id: 4,
      name: 'Parakeet',
      category: 'Birds',
      age: '6 months',
      gender: 'Male',
      location: 'Sfax',
      price: '50 DT',
      image: require('../../assets/animaux/bird1.png'),
      description: 'Perruche colorée et très sociable.',
      owner: 'Leila Ben Salah',
      phone: '+216 20 987 654',
      address: 'Rue Mongi Slim, Sfax',
    },
     {
      id: 5,
      name: 'brid',
      category: 'Birds',
      age: '5 months',
      gender: 'Male',
      location: 'Sfax',
      price: '10 DT',
      image: require('../../assets/animaux/bird2.png'),
      description: 'Perruche colorée et très sociable.',
      owner: 'Leila Ben Salah',
      phone: '+216 20 987 654',
      address: 'Rue Mongi Slim, Sfax',
    },
     {
      id: 6,
      name: 'chick pink',
      category: 'chick',
      age: '1 months',
      gender: 'famale',
      location: 'tunis',
      price: '2 DT',
      image: require('../../assets/animaux/chick1.png'),
      description: 'Perruche colorée et très sociable.',
      owner: 'Leila Ben Salah',
      phone: '+216 20 987 654',
      address: 'Rue Mongi Slim, Sfax',
    },
     {
      id: 7,
      name: 'chick green',
      category: 'chick',
      age: '2 months',
      gender: 'Male',
      location: 'Sfax',
      price: '3 DT',
      image: require('../../assets/animaux/chick2.png'),
      description: 'Perruche colorée et très sociable.',
      owner: 'Leila Ben Salah',
      phone: '+216 20 987 654',
      address: 'Rue Mongi Slim, Sfax',
    },
    {
      id: 8,
      name: 'rabbit ',
      category: 'rabbit',
      age: '1 months',
      gender: 'famale',
      location: 'tunis',
      price: '10 DT',
      image: require('../../assets/animaux/rabbit2.png'),
      description: 'Perruche colorée et très sociable.',
      owner: 'Leila Ben Salah',
      phone: '+216 20 987 654',
      address: 'Rue Mongi Slim, Sfax',
    },
    {
      id: 9,
      name: 'rabbit',
      category: 'rabbit',
      age: '2 months',
      gender: 'Male',
      location: 'Sfax',
      price: '10 DT',
      image: require('../../assets/animaux/rabbit1.png'),
      description: 'Perruche colorée et très sociable.',
      owner: 'Leila Ben Salah',
      phone: '+216 20 987 654',
      address: 'Rue Mongi Slim, Sfax',
    },{
      id: 10,
      name: 'Goldendoodle',
      category: 'Dogs',
      age: '1years',
      gender: 'Male',
      location: 'Ariana',
      price: '500 DT',
      image: require('../../assets/animaux/dog3.png'),
      description: 'Adorable Goldendoodle, très affectueux et joueur. Vacciné et en excellente santé. Parfait pour les familles avec enfants.',
      owner: 'Ahmed Ben Ali',
      phone: '+216 12 345 678',
      address: '13 Rue nouvelle, Ariana 2037',
    },{
      id: 11,
      name: 'Goldendoodle',
      category: 'Dogs',
      age: '1 years',
      gender: 'Male',
      location: 'Ariana',
      price: '500 DT',
      image: require('../../assets/animaux/dog4.png'),
      description: 'Adorable Goldendoodle, très affectueux et joueur. Vacciné et en excellente santé. Parfait pour les familles avec enfants.',
      owner: 'Ahmed Ben Ali',
      phone: '+216 12 345 678',
      address: '13 Rue nouvelle, Ariana 2037',
    },{
      id: 12,
      name: 'Persian Cat',
      category: 'Cats',
      age: '1 year',
      gender: 'Female',
      location: 'Tunis',
      price: '300 DT',
      image: require('../../assets/animaux/cat2.png'),
      description: 'Magnifique chat persan au caractère doux et calme. Idéal pour appartement.',
      owner: 'Sara Khalil',
      phone: '+216 98 765 432',
      address: 'Avenue Habib Bourguiba, Tunis',
    },{
      id: 14,
      name: 'hamestrou',
      category: 'Others',
      age: '1 year',
      gender: 'Female',
      location: 'Tunis',
      price: '300 DT',
      image: require('../../assets/animaux/hamestrou.png'),
      description: 'Magnifique chat persan au caractère doux et calme. Idéal pour appartement.',
      owner: 'Sara Khalil',
      phone: '+216 98 765 432',
      address: 'Avenue Habib Bourguiba, Tunis',
    },
    
    

  ];

  // Changement automatique du banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevBanner = () => {
    setCurrentBannerIndex(currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1);
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex((currentBannerIndex + 1) % banners.length);
  };

  // Filtrer les annonces selon la catégorie
  const filteredAnnouncements = selectedCategory === 'All' 
    ? announcements 
    : announcements.filter(item => item.category === selectedCategory);

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
          <TouchableOpacity>
            <Icon name="bell" size={24} color="#1F5C40" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Hi, Discover animals...</Text>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {/* Banner avec 3 images */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.arrowButton} onPress={handlePrevBanner}>
            <Icon name="chevron-left" size={20} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.banner}>
            <Image
              source={banners[currentBannerIndex]}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity style={styles.arrowButton} onPress={handleNextBanner}>
            <Icon name="chevron-right" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Points indicateurs */}
        <View style={styles.dotsContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentBannerIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Catégories d'animaux */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => setSelectedCategory(category.name)}
            >
              <View
                style={[
                  styles.categoryIcon,
                  selectedCategory === category.name && styles.categoryIconActive,
                ]}
              >
                <Image source={category.icon} style={styles.categoryImage} resizeMode="contain" />
              </View>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category.name && styles.categoryNameActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Liste des annonces en blocs verticaux */}
        <View style={styles.announcementsContainer}>
          {filteredAnnouncements.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.animalCard}
              onPress={() => navigation.navigate('AnnouncementDetail', { animal: item })}
            >
              <Image source={item.image} style={styles.animalImage} resizeMode="cover" />
              
              {/* Info overlay sur l'image */}
              <View style={styles.animalOverlay}>
                <Text style={styles.animalName}>{item.name}</Text>
                <View style={styles.badgesRow}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.age}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.gender}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.location}</Text>
                  </View>
                </View>
              </View>

              {/* Bouton favoris */}
              <TouchableOpacity style={styles.favoriteButton}>
                <Icon name="heart" size={20} color="#E97A3A" />
              </TouchableOpacity>

              {/* Prix */}
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bouton flottant + pour ajouter une annonce */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAnnouncement')}
      >
        <Icon name="plus" size={28} color="#FFF" />
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
    marginBottom: 10,
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
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4A574',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#E97A3A',
    width: 24,
  },
  categoriesScroll: {
    paddingLeft: 20,
    marginBottom: 20,
    maxHeight: 100,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
  },
  categoryIconActive: {
    backgroundColor: '#E97A3A',
  },
  categoryImage: {
    width: 35,
    height: 35,
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontWeight: '500',
  },
  categoryNameActive: {
    color: '#E97A3A',
    fontWeight: 'bold',
  },
  announcementsContainer: {
    paddingHorizontal: 20,
  },
  animalCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    height: 320,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  animalImage: {
    width: '100%',
    height: '100%',
  },
  animalOverlay: {
    position: 'absolute',
    bottom: 60,
    left: 15,
    right: 15,
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1F5C40',
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E97A3A',
    paddingVertical: 15,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
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
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 4,
    shadowRadius: 10,
  },
});