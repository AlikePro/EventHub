import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const events = [
  {
    id: 'astana-hub',
    company: 'Astana Hub',
    type: 'Стажировка',
    address: 'пр-т. Мангилик Ел. 55/8, Астана 020000',
    image: require('../assets/images/astanahub.png'),
  },
  {
    id: 'astana-zhastary',
    company: 'Астана Жастары',
    type: 'Волонтерство',
    address: 'проспект Сарыарка 13, Астана 010000',
    image: require('../assets/images/azhastary.jpeg'),
  },
  {
    id: 'phoenix-mun',
    company: 'Phoenix MUN',
    type: 'Модель ООН',
    address: 'Хусейн бен Талал 21, Астана 010000',
    image: require('../assets/images/mun.png'),
  },
];

export default function MainFeedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.sectionTitle}>Ивенты дня</Text>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.card}
            onPress={() => router.push(`/event-details?id=${event.id}`)}
          >
            <Image source={event.image} style={styles.cardImage} />
            <View style={styles.cardInfoRow}>
              <Text style={styles.cardTitle}>{event.company}</Text>
              <Text style={styles.cardType}>{event.type}</Text>
            </View>
            <Text style={styles.cardAddress}>{event.address}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/MainMenu')}>
          <Text style={styles.tabText}>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Text style={styles.tabTextActive}>Ивенты дня</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/map')}>
          <Text style={styles.tabText}>Карта</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/profile')}>
          <Text style={styles.tabText}>Профиль</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 64 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e1e9e',
    marginTop: 16, // изменено с 24 на 16
    marginLeft: 18,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e9e',
  },
  cardType: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: '#1e1e9e',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 90,
    textAlign: 'right',
  },
  cardAddress: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
    marginLeft: 2,
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10,
    paddingBottom: 24,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    shadowColor: '#222',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 12,
    elevation: 12,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: '#1e1e9e',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#fff',
    backgroundColor: '#1e1e9e',
    fontWeight: 'bold',
    fontSize: 14,
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});