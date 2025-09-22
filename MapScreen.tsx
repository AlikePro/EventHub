import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

const markers = [
  { id: 1, title: 'Astana Hub', description: 'Стажировка\nВозраст: 18+\nКурс: анализ данных', lat: 51.0907, lng: 71.4187 },
  { id: 2, title: 'NU', description: 'Модель ООН\nВозраст: 16+\nДедлайн: 12.07', lat: 51.0915, lng: 71.3980 },
  { id: 3, title: 'Ботанический парк', description: 'Субботник\nВозраст: 14+\nУборка и помощь', lat: 51.0845, lng: 71.4142 },
];

export default function MapScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim() === '') {
      console.error('Ошибка: поле поиска пустое');
      return;
    }
    console.log(`Поиск: ${search}`);
    // Логика поиска может быть добавлена здесь
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Карта ивентов</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.0907,
          longitude: 71.4187,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {markers.length > 0 ? (
          markers.map(marker => (
            <Marker key={marker.id} coordinate={{ latitude: marker.lat, longitude: marker.lng }}>
              <Callout onPress={() => router.push(`/event-details?title=${marker.title}&description=${marker.description}`)}>
                <View style={styles.calloutBox}>
                  <Text style={styles.calloutTitle}>{marker.title}</Text>
                  <Text style={styles.calloutDesc}>{marker.description}</Text>
                </View>
              </Callout>
            </Marker>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Нет доступных маркеров</Text>
        )}
      </MapView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/MainMenu')}>
          <Text style={styles.tabText}>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/main-feed')}>
          <Text style={styles.tabText}>Ивенты дня</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Text style={styles.tabTextActive}>Карта</Text>
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
    marginLeft: 18,
    marginBottom: 8,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 8, zIndex: 10 },
  searchInput: { flex: 1, borderWidth: 1.5, borderColor: '#1e1e9e', borderRadius: 20, padding: 10, fontSize: 16, backgroundColor: '#fff', marginRight: 8 },
  searchBtn: { backgroundColor: '#1e1e9e', borderRadius: 20, padding: 10 },
  searchIcon: { color: '#fff', fontSize: 18 },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height - 180 },
  calloutBox: { minWidth: 140, backgroundColor: '#fff', borderRadius: 12, padding: 8, alignItems: 'center' },
  calloutTitle: { fontWeight: 'bold', color: '#1e1e9e', fontSize: 15, marginBottom: 2 },
  calloutDesc: { color: '#222', fontSize: 13 },
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
  tabBtn: { flex: 1, alignItems: 'center' },
  tabText: { color: '#1e1e9e', fontWeight: 'bold', fontSize: 14 },
  tabTextActive: {
    color: '#fff',
    backgroundColor: '#1e1e9e',
    fontWeight: 'bold',
    fontSize: 14,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});