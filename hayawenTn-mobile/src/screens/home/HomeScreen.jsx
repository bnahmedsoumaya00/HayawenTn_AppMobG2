import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerScrollRef = useRef(null);

  // 3 images du banner qui changent automatiquement
  const banners = [
    require('../../assets/affiche/banner1.png'),
    require('../../assets/affiche/banner2.png'),
    require('../../assets/affiche/banner3.png'),
  ];

  // Catégories avec navigation
  const categories = [
    { id: 1, name: 'Food', icon: require('../../assets/icons/food.png'), route: 'Products' },
    { id: 2, name: 'Toy', icon: require('../../assets/icons/toy.png'), route: 'Products' },
    { id: 3, name: 'Potion', icon: require('../../assets/icons/potion.png'), route: 'Products' },
    { id: 4, name: 'veto', icon: require('../../assets/icons/Vector.png'), route: 'Veterinarians' },
    { id: 5, name: 'animaux', icon: require('../../assets/icons/annonces2.png'), route: 'Announcements' },
    { id: 6, name: 'Dress', icon: require('../../assets/icons/dress.png'), route: 'Products' },
  ];

  // Produits populaires
  const products = [
    { id: 1, name: 'Ollie Dog Food', price: '45.99 DT', image: require('../../assets/images/product1.png') },
    { id: 2, name: 'Premium Cat Food', price: '39.99 DT', image: require('../../assets/images/product2.png') },
  ];

  // Changement automatique du banner toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        bannerScrollRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Navigation flèche gauche banner
  const handlePrevBanner = () => {
    const newIndex = currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1;
    setCurrentBannerIndex(newIndex);
    bannerScrollRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
    });
  };

  // Navigation flèche droite banner
  const handleNextBanner = () => {
    const newIndex = (currentBannerIndex + 1) % banners.length;
    setCurrentBannerIndex(newIndex);
    bannerScrollRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
    });
  };

  // Rendu d'un banner
  const renderBanner = ({ item }) => (
    <View style={styles.bannerItem}>
      <Image source={item} style={styles.bannerImage} resizeMode="cover" />
    </View>
  );

  // Rendu d'une catégorie
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate(item.route)}
    >
      <View style={styles.categoryIcon}>
        <Image source={item.icon} style={styles.categoryImage} resizeMode="contain" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Rendu d'un produit
  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} resizeMode="cover" />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header avec Logo */}
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

        <Text style={styles.subtitle}>Hi, Discover posts...</Text>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {/* Banner Carousel avec 3 images */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.arrowLeft} onPress={handlePrevBanner}>
            <Icon name="chevron-left" size={20} color="#FFF" />
          </TouchableOpacity>

          <FlatList
            ref={bannerScrollRef}
            data={banners}
            renderItem={renderBanner}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={styles.bannerList}
          />

          <TouchableOpacity style={styles.arrowRight} onPress={handleNextBanner}>
            <Icon name="chevron-right" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Indicateurs du carousel */}
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

        {/* Catégories horizontales */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        />

        {/* Popular Item Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Item</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

        {/* Liste des produits */}
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsScroll}
        />

        {/* Lien rapide vers Vétérinaires */}
        <TouchableOpacity
          style={styles.quickLinkVet}
          onPress={() => navigation.navigate('Veterinarians')}
        >
          <Icon name="heart" size={20} color="#E97A3A" />
          <Text style={styles.quickLinkText}>Find a Veterinarian</Text>
          <Icon name="arrow-right" size={20} color="#E97A3A" />
        </TouchableOpacity>

        {/* Banner Vétérinaire (2 images alternées) */}
        <TouchableOpacity
          style={styles.doctorBanner}
          onPress={() => navigation.navigate('Veterinarians')}
        >
          <View style={styles.doctorContent}>
            <Text style={styles.doctorTitle}>FIND DOCTOR</Text>
            <Text style={styles.doctorSubtitle}>NEAR YOU</Text>
          </View>
          <Image
            source={require('../../assets/images/doctor-banner.png')}
            style={styles.doctorImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Featured Item Section (comme les carousels produits précédents) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Item</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => `featured-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsScroll}
        />

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
    marginBottom: 10,
  },
  arrowLeft: {
    width: 35,
    height: 35,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  arrowRight: {
    width: 35,
    height: 35,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  bannerList: {
    flex: 1,
  },
  bannerItem: {
    width: width - 110,
    height: 180,
    borderRadius: 0,
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
    paddingRight: 20,
    marginBottom: 25,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    width: 70,
    height: 70,
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
  categoryImage: {
    width: 40,
    height: 40,
  },
  categoryName: {
    fontSize: 12,
    color: '#000',
    marginTop: 8,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F5C40',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E97A3A',
  },
  productsScroll: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 25,
  },
  productCard: {
    width: 180,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E97A3A',
  },
  quickLinkVet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLinkText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F5C40',
    marginLeft: 10,
  },
  doctorBanner: {
    height: 140,
    backgroundColor: '#4FC3F7',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  doctorContent: {
    flex: 1,
  },
  doctorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  doctorSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 5,
  },
  doctorImage: {
    width: 100,
    height: 100,
  },
});