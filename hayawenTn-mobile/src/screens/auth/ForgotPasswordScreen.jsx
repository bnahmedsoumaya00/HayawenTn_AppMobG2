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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer votre email');
      return;
    }
    // TODO: Appel API pour envoyer email de récupération
    Alert.alert('Succès', 'Un email de récupération a été envoyé à ' + email);
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Don't worry! It occurs. Please enter the email address linked with your account.
        </Text>

        {/* Input Email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="#8A96BC"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Send Code Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleResetPassword}>
          <Text style={styles.sendButtonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E6D5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F5C40',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B8B6D',
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 2.208,
    borderColor: '#F7F8F8',
    borderRadius: 14.91,
    paddingHorizontal: 24,
    fontSize: 14,
    color: '#000',
  },
  sendButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#1F5C40',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
});