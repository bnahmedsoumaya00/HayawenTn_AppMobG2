import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function MyAnnouncementsScreen({ navigation }) {
  const myAnnouncements = [
    {
      id: 1,
      title: 'Goldendoodle',
      type: 'Vente',
      price: '500 DT',
      date: '15 Nov 2024',
      status: 'active',
    },
    {
      id: 2,
      title: 'Chat Persan',
      type: 'Adoption',
      price: 'Gratuit',
      date: '10 Nov 2024',
      status: 'active',
    },
  ];

  const handleDelete = (id) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer cette annonce ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            // TODO: Appel API pour supprimer
            Alert.alert('Succès', 'Annonce supprimée');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Annonces</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAnnouncement')}>
          <Icon name="plus" size={24} color="#1F5C40" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {myAnnouncements.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="file-text" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Aucune annonce</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('CreateAnnouncement')}
            >
              <Text style={styles.addButtonText}>Créer une annonce</Text>
            </TouchableOpacity>
          </View>
        ) : (
          myAnnouncements.map((announcement) => (
            <View key={announcement.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{announcement.title}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{announcement.type}</Text>
                </View>
              </View>

              <Text style={styles.cardPrice}>{announcement.price}</Text>
              <Text style={styles.cardDate}>{announcement.date}</Text>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('EditAnnouncement', { announcement })}
                >
                  <Icon name="edit-2" size={18} color="#1F5C40" />
                  <Text style={styles.editButtonText}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(announcement.id)}
                >
                  <Icon name="trash-2" size={18} color="#FF0000" />
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: '#1F5C40',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E97A3A',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1E6D5',
    padding: 10,
    borderRadius: 8,
    gap: 5,
  },
  editButtonText: {
    color: '#1F5C40',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    padding: 10,
    borderRadius: 8,
    gap: 5,
  },
  deleteButtonText: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '500',
  },
});