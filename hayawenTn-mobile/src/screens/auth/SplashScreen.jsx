// src/screens/auth/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { colors } from '../../styles/colors';

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Animation de fondu
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Redirection directe vers Home après 2s
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/loogo.png')} // ou logo.png
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // #1F5C40
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 273,
    height: 202,
  },
});