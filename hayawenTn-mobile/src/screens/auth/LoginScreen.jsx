import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { login } from '../../services/api/authApi';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const credentials = {
        email: email.trim(),
        password
      };
      
      console.log('Login:', credentials);
      
      const response = await login(credentials);

      if (response.success) {
        Alert.alert('Success', 'Login successful!');
        
        // Si on vient du ProfileScreen
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.replace('MainApp');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

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

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Loading...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>Register</Text>
          <Icon name="arrow-right" size={20} color="#FFFFFF" />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  logo: {
    width: 200,
    height: 180,
    marginBottom: 50,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    position: 'relative',
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
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 17,
  },
  forgotPassword: {
    fontSize: 15,
    color: '#1F5C40',
    textDecorationLine: 'underline',
    marginBottom: 20,
    alignSelf: 'flex-end',
    width: '100%',
    textAlign: 'right',
  },
  loginButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#1F5C40',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  registerButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#E97A3A',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  registerButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
});