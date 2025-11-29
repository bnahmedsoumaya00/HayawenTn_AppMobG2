import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { register } from '../../services/api/authApi';  // ← AJOUTER CETTE LIGNE

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !displayName || !phoneNumber) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Séparer displayName en firstName et lastName
    const names = displayName.trim().split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || names[0];

    setLoading(true);

    try {
      const userData = {
        email: email.trim(),
        password,
        firstName,
        lastName,
        phone: phoneNumber.trim()
      };
      
      console.log('Register:', userData);
      
      const response = await register(userData);

      if (response.success) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.replace('MainApp');
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Error', error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }};
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>Start By Creating an Account</Text>

        {/* Form */}
       {/* Display Name */}
<View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Enter Display Name"
    placeholderTextColor="#8A96BC"
    value={displayName}
    onChangeText={setDisplayName}
  />
</View>

{/* Phone Number */}
<View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Enter Phone Number"
    placeholderTextColor="#8A96BC"
    value={phoneNumber}
    onChangeText={setPhoneNumber}
    keyboardType="phone-pad"
  />
</View>

{/* Email */}
<View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Enter Email"
    placeholderTextColor="#8A96BC"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
  />
</View>

{/* Password */}
<View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Enter Password"
    placeholderTextColor="#8A96BC"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
  />
  <TouchableOpacity
    style={styles.eyeIcon}
    onPress={() => setShowPassword(!showPassword)}
  >
    <Icon
      name={showPassword ? 'eye' : 'eye-off'}
      size={20}
      color="#8A96BC"
    />
  </TouchableOpacity>
</View>

          <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E6D5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 60,
  },
  backButton: {
    width: 24,
    height: 24,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1F5C40',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#4B8B6D',
    marginBottom: 40,
  },
  form: {
    gap: 15,
  },
  input: {
    width: 362,
    height: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 2.208,
    borderColor: '#F7F8F8',
    borderRadius: 14.91,
    paddingHorizontal: 24,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8A96BC',
  },
  signupButton: {
    width: 362,
    height: 52,
    backgroundColor: '#1F5C40',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
});