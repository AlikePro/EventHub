import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={require('../assets/images/eventhub_logo.png')} style={styles.logoSmall} />
        <Text style={styles.headerTitle}>EVENT HUB</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Вход</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.inputLine}
            placeholder="Введите email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
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

        <View style={styles.linksRow}>
          <TouchableOpacity onPress={() => router.push('/register-profile')}>
            <Text style={styles.link}>Регистрация</Text>
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
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginBottom: 16 },
  logoSmall: { width: 40, height: 40, resizeMode: 'contain', marginRight: 8 },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e1e9e',
    textShadowColor: '#b3b3ff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1e1e9e', alignSelf: 'center', marginBottom: 24 },
  inputContainer: { marginBottom: 16 },
  inputLabel: { fontSize: 14, color: '#1e1e9e', marginBottom: 4, fontWeight: 'bold' },
  inputLine: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#1e1e9e',
    paddingVertical: 6,
    fontSize: 16,
    color: '#000',
  },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  link: { color: '#1e1e9e', fontWeight: 'bold', fontSize: 14 },
  button: { backgroundColor: '#1e1e9e', borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});