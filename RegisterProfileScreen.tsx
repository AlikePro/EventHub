import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Image source={require('../assets/images/eventhub_logo.png')} style={styles.logoSmall} />
          <Text style={styles.headerTitle}>EVENT HUB</Text>
        </View>
        <Text style={styles.title}>Регистрация профиля</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Имя</Text>
          <TextInput
            style={styles.inputLine}
            placeholder="Введите имя"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email или номер телефона</Text>
          <TextInput
            style={styles.inputLine}
            placeholder="Введите email или номер"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Дата рождения</Text>
          <TextInput
            style={styles.inputLine}
            placeholder="Введите дату рождения"
            placeholderTextColor="#aaa"
            value={dob}
            onChangeText={setDob}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Пароль</Text>
          <TextInput
            style={styles.inputLine}
            placeholder="Введите пароль"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Место проживания</Text>
          <TextInput
            style={styles.inputLine}
            placeholder="Введите место проживания"
            placeholderTextColor="#aaa"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Интересы</Text>
          <TextInput
            style={styles.inputLine}
            placeholder="Введите интересы"
            placeholderTextColor="#aaa"
            value={interests}
            onChangeText={setInterests}
          />
        </View>

        <View style={styles.linksRow}>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.link}>Войти</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Забыли пароль?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/MainMenu')}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginTop: 24 },
  logoSmall: { width: 40, height: 40, resizeMode: 'contain', marginRight: 8 },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e1e9e',
    textShadowColor: '#b3b3ff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1e1e9e', alignSelf: 'center', marginBottom: 24 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inputContainer: { marginBottom: 16, marginHorizontal: 20 },
  inputLabel: { fontSize: 14, color: '#1e1e9e', marginBottom: 4, fontWeight: 'bold' },
  inputLine: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#1e1e9e',
    paddingVertical: 6,
    fontSize: 16,
    color: '#000',
  },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, marginHorizontal: 20 },
  link: { color: '#1e1e9e', fontWeight: 'bold', fontSize: 14 },
  button: { backgroundColor: '#1e1e9e', borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 8, marginHorizontal: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});