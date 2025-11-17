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

export default function HomeScreen({ navigation }) {
  const categories = [
    { id: 1, name: 'Food', icon: require('../../assets/icons/food.png') },
    { id: 2, name: 'Toy', icon: require('../../assets/icons/toy.png') },
    { id: 3, name: 'Potion', icon: require('../../assets/icons/potion.png') },
    { id: 4, name: 'Finery', icon: require('../../assets/icons/finery.png') },
    { id: 5, name: 'Tools', icon: require('../../assets/icons/tools.png') },

    { id: 6, name: 'Dress', icon: require('../../assets/icons/dress.png') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header avec Logo */}
        <View style={styles.header}>
          <Text style={styles.logo}>HayaWenTN</Text>
          <TouchableOpacity>
            <Icon name="logo-header" size={24} color="#1F5C40" />
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

        {/* Banner SPECIAL OFFER */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.arrowLeft}>
            <Icon name="chevron-left" size={20} color="#000" />
          </TouchableOpacity>
          
          <View style={styles.banner}>
            <Text style={styles.bannerBadge}>SPECIAL OFFER</Text>
            <Text style={styles.bannerDiscount}>25% Discount</Text>
            <Image
              source={require('../../assets/images/banner-offer.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity style={styles.arrowRight}>

            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>

       


        {/* Featured Item Section */}
        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>Featured Item</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

      

        {/* Popular Item Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Item</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

       

        {/* Find Doctor Banner */}
        <TouchableOpacity
          style={styles.doctorBanner}
          onPress={() => navigation.navigate('Veterinarians')}
        >

          <Text style={styles.doctorTitle}>FIND A VET</Text>
          <Text style={styles.doctorSubtitle}>NEAR YOU</Text>
          <Image
            source={require('../../assets/images/doctor-banner.png')}
            style={styles.doctorImage}
            resizeMode="cover"

/>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F5C40',
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
    backgroundColor: '#FFA07A',
    borderRadius: 12,

    padding: 15,


    justifyContent: 'center',
  },
  bannerBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,


    alignSelf: 'flex-start',
  },
  bannerDiscount: {
    fontSize: 20,
    fontWeight: 'bold',


    color: '#FFF',
    marginTop: 5,
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

    fontWeight: '600',
    color: '#1F5C40',
  },
  viewAll: {
    fontSize: 12,

    fontWeight: '500',
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

  productPlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },

  productName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E97A3A',
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
    fontWeight: 'bold',


    color: '#FFF',
  },
  doctorBanner: {
    height: 120,
    backgroundColor: '#4FC3F7',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,

    padding: 15,

    justifyContent: 'center',
  },
  doctorTitle: {
    fontSize: 16,
    fontWeight: 'bold',

    color: '#FFF',
  },
  doctorSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',

    color: '#FFF',
    marginTop: 5,
  },
});