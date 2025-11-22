import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }
    // TODO: Appel API
    Alert.alert('Succès', 'Mot de passe modifié avec succès');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Glad to see you, Again!</Text>

        {/* Old Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            placeholderTextColor="#8A96BC"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={!showOld}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowOld(!showOld)}
          >
            <Icon name={showOld ? 'eye' : 'eye-off'} size={20} color="#8A96BC" />
          </TouchableOpacity>
        </View>

        {/* New Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#8A96BC"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNew}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowNew(!showNew)}
          >
            <Icon name={showNew ? 'eye' : 'eye-off'} size={20} color="#8A96BC" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#8A96BC"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirm}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirm(!showConfirm)}
          >
            <Icon name={showConfirm ? 'eye' : 'eye-off'} size={20} color="#8A96BC" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F5C40',
  },
  content: {
    flex: 1,
    paddingHorizontal: 26,
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
  },
  inputContainer: {
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
    fontWeight: '500',
    color: '#1F5C40',
    textDecorationLine: 'underline',
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  saveButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#1F5C40',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.2,
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
});