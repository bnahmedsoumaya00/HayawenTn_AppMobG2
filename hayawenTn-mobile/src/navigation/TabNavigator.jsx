import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#1F5C40',
      }}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconActive : styles.iconInactive}>
              <Icon name="home" size={28} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Announcements"
        component={AnnouncementsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconActive : styles.iconInactive}>
              <Icon name="heart" size={28} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconActive : styles.iconInactive}>
              <Icon name="shopping-bag" size={28} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Veterinarians"
        component={VeterinariansScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconActive : styles.iconInactive}>
              <MaterialCommunityIcons name="stethoscope" size={28} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconActive : styles.iconInactive}>
              <Icon name="user" size={28} color={focused ? '#fff' : color} />
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
    paddingBottom: 20,
    paddingTop: 3,
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

  iconInactive: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconActive: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#E97A3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
