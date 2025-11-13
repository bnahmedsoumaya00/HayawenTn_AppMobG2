// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';

// Écrans
import HomeScreen from '../screens/home/HomeScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
import AnnouncementsScreen from '../screens/announcements/AnnouncementsScreen';
import VeterinariansScreen from '../screens/veterinarians/VeterinariansScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'ic_home';
          else if (route.name === 'Products') iconName = 'Shopping bag';
          else if (route.name === 'Announcements') iconName = 'annonces';
          else if (route.name === 'Veterinarians') iconName = 'Stethoscope';
          else if (route.name === 'Profile') iconName = 'account_circle';

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8A96BC',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Tab.Screen name="Products" component={ProductsScreen} options={{ title: 'Produits' }} />
      <Tab.Screen name="Announcements" component={AnnouncementsScreen} options={{ title: 'Annonces' }} />
      <Tab.Screen name="Veterinarians" component={VeterinariansScreen} options={{ title: 'Vétérinaires' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}