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

export default function ProductsScreen({ navigation }) {
  const categories = [
    { id: 1, name: 'Food', icon: '🍖', color: '#FFAF42' },
    { id: 2, name: 'Toy', icon: '🎾', color: '#FFF' },
    { id: 3, name: 'Potion', icon: '💊', color: '#FFF' },
    { id: 4, name: 'Finery', icon: '👔', color: '#FFF' },
    { id: 5, name: 'Tools', icon: '🔧', color: '#FFF' },
    { id: 6, name: 'Dress', icon: '👗', color: '#FFF' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Dog Food',
      price: '45 DT',
      discount: '50%',
      image: require('../../assets/images/product1.png'),
    },
    {
      id: 2,
      name: 'Cat Toy Set',
      price: '25 DT',
      discount: '30%',
      image: require('../../assets/images/product2.png'),
    },
  ];

  const popularProducts = [
    {
      id: 3,
      name: 'Pet Carrier Bag',
      price: '80 DT',
      image: require('../../assets/images/product2.png'),
    },
    {
      id: 4,
      name: 'Dog Leash',
      price: '15 DT',
      image: require('../../assets/images/product1.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header avec Logo */}
        <View style={styles.header}>
          <Text style={styles.logo}>HayaWenTN</Text>
          <View style={styles.headerRight}>
            <Text style={styles.language}>EN</Text>
            <TouchableOpacity>
              <Icon name="logo-header" size={24} color="#1F5C40" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {/* Banner SPECIAL OFFER */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.arrowLeft}>
            <Icon name="chevron-left" size={20} color="#000" />
          </TouchableOpacity>
          
          <View style={styles.banner}>
            <Image
                          source={require('../../assets/affiche/banner1.png')}
                          style={styles.bannerImage}
                          resizeMode="cover"
                        />
          </View>

          <TouchableOpacity style={styles.arrowRight}>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Categories Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
              <View style={[
                styles.categoryIcon,
                { backgroundColor: cat.color }
              ]}>
                <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Item Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Item</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigation.navigate('ProductDetails', { product })}
            />
          ))}
        </ScrollView>

        {/* Popular Item Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Item</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigation.navigate('ProductDetails', { product })}
            />
          ))}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

// Composant ProductCard
function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <Image source={product.image} style={styles.productImage} resizeMode="cover" />
      
      {product.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{product.discount}</Text>
        </View>
      )}

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.productPrice}>{product.price}</Text>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  language: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: '#1F5C40',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginTop: 15,
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
    backgroundColor: '#FFB399',
    borderRadius: 12,
    padding: 15,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerBadge: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  bannerDiscount: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#FFF',
    marginTop: 5,
  },
  bannerImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 150,
    height: 120,
  },
  categoriesScroll: {
    paddingLeft: 20,
    marginBottom: 25,
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
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 10,
    fontFamily: 'Roboto-Medium',
    color: '#000',
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-SemiBold',
    color: '#1F5C40',
  },
  viewAll: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#E97A3A',
  },
  productCard: {
    width: 160,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginLeft: 20,
    marginBottom: 20,
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
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#D4A574',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#FFF',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#E97A3A',
  },
});
