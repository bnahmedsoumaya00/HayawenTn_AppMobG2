import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/home/HomeScreen';
import AnnouncementsScreen from '../screens/announcements/AnnouncementsScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
import VeterinariansScreen from '../screens/veterinarians/VeterinariansScreen';
import ProfileScreen from '../screens/profile/ProfileScreen'; // ✅ CORRIGÉ

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#1F5C40',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Icon name="home" size={28} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Announcements"
        component={AnnouncementsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Icon name="heart" size={28} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Icon name="shopping-bag" size={28} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Veterinarians"
        component={VeterinariansScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <MaterialCommunityIcons name="stethoscope" size={28} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Icon name="user" size={28} color={color} />
            </View>
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
    height: 90,
    paddingBottom:35,
    paddingTop: 18,
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
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerActive: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E97A3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});