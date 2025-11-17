import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image } from 'react-native';

// Import des écrans
import HomeScreen from '../screens/home/HomeScreen';
import AnnouncementsScreen from '../screens/announcements/AnnouncementsScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
import VeterinariansScreen from '../screens/veterinarians/VeterinariansScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#E97A3A',
        tabBarInactiveTintColor: '#1F5C40',
      }}
    >

      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/ic_home.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

      {/* Announcements */}
      <Tab.Screen
        name="Announcements"
        component={AnnouncementsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/annonces.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

      {/* Products */}
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/Shoppingbag.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

      {/* Veterinarians */}
      <Tab.Screen
        name="Veterinarians"
        component={VeterinariansScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/Stethoscope.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/icons/account_circle.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
