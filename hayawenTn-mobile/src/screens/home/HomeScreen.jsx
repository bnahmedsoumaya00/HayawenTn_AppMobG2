import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeScreen({ navigation }) {
  const categories = [
    { id: 1, name: 'Food', icon: '🍖', color: '#FFAF42' },
    { id: 2, name: 'Toy', icon: '🎾' },
    { id: 3, name: 'Potion', icon: '💊' },
    { id: 4, name: 'Finery', icon: '👔' },
    { id: 5, name: 'Tools', icon: '🔧' },
    { id: 6, name: 'Dress', icon: '👗' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/logo-header.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999999"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Banner */}
          <Image
          source={require('../../assets/images/banner-offer.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, cat.color && { backgroundColor: cat.color }]}>
                <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Items */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Item</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ProductCard
            title="Ollie Food"
            image={require('../../assets/images/product1.png')}
            onPress={() => navigation.navigate('ProductDetails')}
          />
          <ProductCard
            title="Ollie Food 2"
            image={require('../../assets/images/product2.png')}
          />
        </ScrollView>

        {/* Find Doctor */}
        <TouchableOpacity
          style={styles.doctorBanner}
          onPress={() => navigation.navigate('Veterinarians')}
        >
          <Text style={styles.doctorTitle}>FIND DOCTOR</Text>
          <Text style={styles.doctorSubtitle}>NEAR YOU</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function ProductCard({ title, image, onPress }) {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <Image source={image} style={styles.productImage} resizeMode="cover" />
      <Text style={styles.productTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E6D5',
  },
  logo: {
    width: 154,
    height: 36.8,
    marginTop: 33,
    marginLeft: 31,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
    paddingHorizontal: 20,
    fontSize: 17,
  },
  searchButton: {
    width: 73,
    height: 47,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 21,
    borderBottomRightRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -73,
  },
  banner: {
    height: 123,
    backgroundColor: '#EBE5D9',
    borderRadius: 16,
    marginHorizontal: 41,
    marginTop: 30,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  bannerTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#FFAF42',
  },
  bannerDiscount: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  categoriesScroll: {
    marginTop: 30,
    paddingLeft: 19,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    width: 54,
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 10,
    fontFamily: 'Roboto-Medium',
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-SemiBold',
    color: '#1F5C40',
  },
  viewAll: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    color: '#E97A3A',
  },
  productCard: {
    width: 186.58,
    height: 174.28,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginLeft: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 130,
  },
  productTitle: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    padding: 10,
  },
  doctorBanner: {
    height: 133,
    backgroundColor: '#EBE5D9',
    borderRadius: 16,
    marginHorizontal: 29,
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  doctorTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#FFAF42',
  },
  doctorSubtitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
});