// App.js
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Auth Screens
import SplashScreen from './src/screens/auth/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import OnboardingScreen from './src/screens/auth/OnboardingScreen';

// Main App
import TabNavigator from './src/navigation/TabNavigator';

// Context
import { AuthContext } from './src/context/AuthContext';

const Stack = createStackNavigator();

// Écrans sans navbar (authentification)
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Écrans AVEC navbar (après login)
function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* Vous pourrez ajouter ici les écrans détaillés comme ProductDetails */}
    </Stack.Navigator>
  );
}

// App racine
export default function App() {
  const [user, setUser] = useState(null); // ou utilisez AuthContext si prêt

  // Simulation : pour le moment, on force l’accès à Home
  const isLoggedIn = true; // ← à remplacer plus tard par user !== null

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}