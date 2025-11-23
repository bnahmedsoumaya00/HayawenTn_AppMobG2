import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

export default function ProductsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Dress');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerScrollRef = useRef(null);

  // ✅ 3 images du banner
  const banners = [
    require('../../assets/affiche/banner2.png'),
    require('../../assets/affiche/banner3.png'),
  ];

  // ✅ Catégories avec icônes PNG (pas emoji)
  const categories = [
    { id: 1, name: 'Dress', icon: require('../../assets/icons/dress.png') },
    { id: 2, name: 'Food', icon: require('../../assets/icons/food.png') },
    { id: 3, name: 'Potion', icon: require('../../assets/icons/potion.png') },
    { id: 4, name: 'Sac', icon: require('../../assets/icons/sac.png') },
    { id: 6, name: 'Toy', icon: require('../../assets/icons/toy.png') },
  ];

  // ✅ Changement automatique du banner toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Navigation flèche gauche
  const handlePrevBanner = () => {
    const newIndex = currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1;
    setCurrentBannerIndex(newIndex);
  };

  // ✅ Navigation flèche droite
  const handleNextBanner = () => {
    const newIndex = (currentBannerIndex + 1) % banners.length;
    setCurrentBannerIndex(newIndex);
  };

  const productsData = {
    Dress: {
      dog: [
        {
          id: 1,
          name: 'stoubari dress dog',
          price: '15 DT',
          image: require('../../assets/accessoires/dress1.png'),
          description: 'Elegant pink dress for small dogs with matching accessories. Perfect for special occasions and photo shoots.',
          colors: ['#FF69B4', '#87CEEB', '#FFD700'],
        },
        {
          id: 2,
          name: 'robe dog',
          price: '40 DT',
          image: require('../../assets/accessoires/dress2.png'),
          description: 'Complete outfit set including dress, bow tie, and matching accessories for your stylish pet.',
          colors: ['#FF1493', '#00CED1', '#FFD700'],
        },
        {
          id: 3,
          name: 'luxury pet dress',
          price: '35 DT',
          image: require('../../assets/accessoires/dress3.png'),
          description: 'Premium quality dress with delicate embroidery and comfortable fit.',
          colors: ['#FF69B4', '#9370DB', '#F0E68C'],
        },
      ],
      cat: [
        {
          id: 4,
          name: 'elegant cat dress',
          price: '30 DT',
          image: require('../../assets/accessoires/dress4.png'),
          description: 'Stylish dress designed for cats with soft fabric.',
          colors: ['#FF69B4', '#87CEEB'],
        },
        {
          id: 5,
          name: 'monton cat dress',
          price: '30 DT',
          image: require('../../assets/accessoires/dress5.png'),
          description: 'Stylish dress designed for cats with soft fabric.',
          colors: ['#FF69B4', '#87CEEB'],
        },
      ],
    },
    Food: {
      dog: [
        {
          id: 6,
          name: 'Olie dog food',
          price: '40 DT',
          image: require('../../assets/nourriture/food1.png'),
          description: 'Premium natural dog food with high-quality proteins, vitamins, and minerals.',
        },
        {
          id: 7,
          name: 'SKINHEALTH dog food',
          price: '20 DT',
          image: require('../../assets/nourriture/food2.png'),
          description: 'Specialized formula for healthy skin and shiny coat.',
        },
        {
          id: 8,
          name: 'premium dog food',
          price: '35 DT',
          image: require('../../assets/nourriture/food3.png'),
          description: 'Complete nutrition for active dogs.',
        },
      ],
      cat: [
        {
          id: 9,
          name: 'felix cat food',
          price: '25 DT',
          image: require('../../assets/nourriture/chat1.png'),
          description: 'Delicious and nutritious cat food with real meat.',
        },
        {
          id: 10,
          name: 'felix cat food',
          price: '15 DT',
          image: require('../../assets/nourriture/chat2.png'),
          description: 'Delicious and nutritious cat food with real meat.',
        },
      ],
    },
    Potion: {
      dog: [
        {
          id: 11,
          name: 'Potion dog',
          price: '25 DT',
          image: require('../../assets/nourriture/potion1.png'),
          description: 'Health supplement for dogs to boost immunity.',
        },
        {
          id: 12,
          name: 'Potion dog',
          price: '40 DT',
          image: require('../../assets/nourriture/potion3.png'),
          description: 'Complete vitamin complex for dogs of all ages.',
        },
      ],
      cat: [
        {
          id: 13,
          name: 'Potion cat',
          price: '25 DT',
          image: require('../../assets/nourriture/potion5.png'),
          description: 'Health supplement for cats to boost immunity.',
        },
        {
          id: 14,
          name: 'Potion cat',
          price: '40 DT',
          image: require('../../assets/nourriture/potion6.png'),
          description: 'Complete vitamin complex for cats of all ages.',
        },
      ],
    },
    Sac: {
      sac: [
        {
          id: 15,
          name: 'Transport Backpack',
          price: '100 DT',
          image: require('../../assets/accessoires/sac1.png'),
          description: 'Comfortable transport backpack for small and medium pets.',
          colors: ['#FF69B4', '#9370DB', '#87CEEB', '#90EE90'],
        },
        {
          id: 16,
          name: 'Travel Carrier',
          price: '85 DT',
          image: require('../../assets/accessoires/sac2.png'),
          description: 'Spacious and secure travel carrier with ventilation.',
          colors: ['#4169E1', '#FF69B4'],
        },
        {
          id: 17,
          name: 'Pet Bag',
          price: '65 DT',
          image: require('../../assets/accessoires/sac3.png'),
          description: 'Stylish pet bag perfect for short trips.',
          colors: ['#FFD700', '#FF6347'],
        },
      ],
    },
    Toy: {
      cat: [
        {
          id: 21,
          name: 'Chew Toy',
          price: '20 DT',
          image: require('../../assets/accessoires/toy1.png'),
          description: 'Durable chew toy for strong teeth.',
        },
        {
          id: 22,
          name: 'Ball Set',
          price: '15 DT',
          image: require('../../assets/accessoires/toy2.png'),
          description: 'Set of bouncing balls for fetch games.',
          colors: ['#FF0000', '#00FF00', '#0000FF'],
        },
        {
          id: 23,
          name: 'Interactive Toy',
          price: '35 DT',
          image: require('../../assets/accessoires/toy3.png'),
          description: 'Smart toy that keeps pets entertained.',
        },
       
      ],
    },
  };

  const currentCategoryData = productsData[selectedCategory] || {};

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <Text style={styles.detailsText}>View details &gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <Image
                             source={require('../../assets/images/logo-header.png')}
                             style={styles.logo}
                             resizeMode="contain"
                           />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* ✅ Banner avec 3 images et flèches */}
      <View style={styles.bannerContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrevBanner}>
          <Icon name="chevron-left" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.banner}>
          <Image
            source={banners[currentBannerIndex]}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity style={styles.arrowButton} onPress={handleNextBanner}>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* ✅ Indicateurs de pagination */}
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

      {/* ✅ Catégories avec icônes PNG */}
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {Object.keys(currentCategoryData).map((animalType) => (
          <View key={animalType}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory} {animalType}
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All &gt;</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={currentCategoryData[animalType]}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsList}
            />
          </View>
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
    logo: {
    width: 150,
    height: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    padding: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  banner: {
    flex: 1,
    height: 140,
    backgroundColor: '#FFB6A3',
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
    marginBottom: 15,
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
    marginBottom: 10,
    maxHeight: 200,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
    width:70,
    height:200,
  },
  categoryIcon: {
    width: 70,
    height: 80,
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
    width: 32,
    height: 32,
   
  },
  categoryName: {
    fontSize: 12,
    color: '#090909ff',
  },
  categoryNameActive: {
    color: '#E97A3A',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingBottom: 50,
    top:15,

  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
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
  productsList: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  productCard: {
    width:180,
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
    height: 140,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E97A3A',
  },
  detailsText: {
    fontSize: 11,
    color: '#666',
  },
});