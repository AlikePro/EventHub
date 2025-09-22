import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AuthScreen({ route, navigation }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const role = route?.params?.role || 'student';

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/eventhub_logo.png')} style={styles.logo} />
      <Text style={styles.title}>{isLogin ? 'Вход' : 'Регистрация профиля'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Имя"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Дата рождения"
          value={dob}
          onChangeText={setDob}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.link}>{isLogin ? 'Регистрация' : 'Вход'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Забыли пароль?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{isLogin ? 'Войти' : 'Продолжить'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e1e9e',
    marginBottom: 24,
  },
  input: {
    width: 280,
    borderWidth: 1.5,
    borderColor: '#1e1e9e',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginBottom: 16,
  },
  link: {
    color: '#1e1e9e',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#1e1e9e',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 36,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
