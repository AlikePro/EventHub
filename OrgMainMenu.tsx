import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

export default function MapScreen() {
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Адрес не найден');
      }
    } catch (error) {
      console.error('Ошибка при получении адреса:', error);
      setAddress('Ошибка при получении адреса');
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = (event: MapPressEvent) => {
    const coordinate = event.nativeEvent.coordinate;
    setMarker(coordinate);
    fetchAddress(coordinate.latitude, coordinate.longitude);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите точку на карте</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.0907,
          longitude: 71.4187,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        onPress={handleMapPress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <View style={styles.addressBox}>
        <Text style={styles.label}>Адрес:</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#1e1e9e" />
        ) : (
          <Text style={styles.addressText}>
            {address || 'Нажмите на карту, чтобы получить адрес'}
          </Text>
        )}
      </View>
      {marker && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({ pathname: '/event-confirmation', params: { address } })}
        >
          <Text style={styles.buttonText}>Продолжить</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e1e9e',
    marginLeft: 18,
    marginBottom: 8,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  addressBox: {
    margin: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  addressText: {
    fontSize: 15,
    color: '#444',
  },
  button: {
    backgroundColor: '#1e1e9e',
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
