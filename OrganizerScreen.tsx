import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const EVENT_TYPES = ['Стажировка','Волонтерство', 'Форум', 'Дебаты', 'Хакатон', 'Марафон'];

export default function OrganizerScreen() {
  const router = useRouter();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedType, setSelectedType] = useState(EVENT_TYPES[0]);
  const [ageLimit, setAgeLimit] = useState(14);
  const [places, setPlaces] = useState(25);
  const [eventLocation, setEventLocation] = useState('');

  const animatedWidths = useRef(EVENT_TYPES.map((_, i) => new Animated.Value(i === 0 ? 1.5 : 1))).current;

  const handleTypePress = (type: string, idx: number) => {
    setSelectedType(type);
    animatedWidths.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === idx ? 1.5 : 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  };

  // Для ввода возраста и мест только числа
  const handleAgeInput = (text: string) => {
    const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) setAgeLimit(num);
    else setAgeLimit(0);
  };
  const handlePlacesInput = (text: string) => {
    const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) setPlaces(num);
    else setPlaces(0);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Image source={require('../assets/images/eventhub_logo.png')} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.orgName}>EventHub</Text>
            <Text style={styles.orgType}>Волонтерство и образование</Text>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>#4</Text>
              <Text style={styles.ratingSub}>в рейтинге по стране</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Название мероприятия</Text>
          <TextInput
            style={styles.input}
            placeholder="Например: Субботник в парке"
            value={eventName}
            onChangeText={setEventName}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Дата и время</Text>
          <TextInput
            style={styles.input}
            placeholder="Укажите дату и время"
            value={eventDate}
            onChangeText={setEventDate}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.typeScroll}
          contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
        >
          {EVENT_TYPES.map((type, idx) => (
            <Animated.View
              key={type}
              style={[
                styles.typeBtnWrap,
                {
                  flex: animatedWidths[idx],
                  zIndex: selectedType === type ? 1 : 0,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.typeBtn,
                  selectedType === type && styles.typeBtnActive,
                ]}
                onPress={() => handleTypePress(type, idx)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.typeBtnText,
                    selectedType === type && styles.typeBtnTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Описание</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Расскажите о цели и деталях мероприятия..."
            value={eventDescription}
            onChangeText={setEventDescription}
            multiline
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Возраст</Text>
            <View style={styles.placesRow}>
              <TouchableOpacity
                onPress={() => setAgeLimit(Math.max(0, ageLimit - 1))}
                style={styles.placesBtn}
              >
                <Text style={styles.placesBtnText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, { width: 50, textAlign: 'center', marginHorizontal: 4, paddingVertical: 4 }]}
                keyboardType="numeric"
                value={ageLimit.toString()}
                onChangeText={handleAgeInput}
                maxLength={3}
              />
              <TouchableOpacity
                onPress={() => setAgeLimit(ageLimit + 1)}
                style={styles.placesBtn}
              >
                <Text style={styles.placesBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Количество мест</Text>
            <View style={styles.placesRow}>
              <TouchableOpacity
                onPress={() => setPlaces(Math.max(1, places - 1))}
                style={styles.placesBtn}
              >
                <Text style={styles.placesBtnText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, { width: 50, textAlign: 'center', marginHorizontal: 4, paddingVertical: 4 }]}
                keyboardType="numeric"
                value={places.toString()}
                onChangeText={handlePlacesInput}
                maxLength={4}
              />
              <TouchableOpacity
                onPress={() => setPlaces(places + 1)}
                style={styles.placesBtn}
              >
                <Text style={styles.placesBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Место проведения мероприятия</Text>
          <TextInput
            style={styles.input}
            placeholder="Укажите место проведения"
            value={eventLocation}
            onChangeText={setEventLocation}
          />
        </View>

        <TouchableOpacity style={styles.photoBtn}>
          <Text style={styles.photoBtnText}>Добавить фото мероприятия</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createBtn} onPress={() => router.push('/OrgMainMenu')}>
          <Text style={styles.createBtnText}>Создать мероприятие</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    backgroundColor: '#f0f0f0',
  },
  orgName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  orgType: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  ratingBox: {
    backgroundColor: '#2d3be7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  ratingSub: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
  },
  inputBox: {
    backgroundColor: '#f7f7fa',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  typeScroll: {
    marginBottom: 14,
    marginTop: 2,
  },
  typeBtnWrap: {
    minWidth: 0,
  },
  typeBtn: {
    backgroundColor: '#f7f7fa',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    paddingHorizontal: 16,
  },
  typeBtnActive: {
    backgroundColor: '#2d3be7',
  },
  typeBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  typeBtnTextActive: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 10,
  },
  value: {
    fontSize: 15,
    color: '#222',
    marginTop: 4,
  },
  placesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  placesBtn: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  placesBtnText: {
    fontSize: 18,
    color: '#2d3be7',
    fontWeight: 'bold',
  },
  placesValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    minWidth: 32,
    textAlign: 'center',
  },
  photoBtn: {
    backgroundColor: '#f7f7fa',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  photoBtnText: {
    color: '#222',
    fontSize: 15,
    fontWeight: 'bold',
  },
  createBtn: {
    backgroundColor: '#2d3be7',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});