import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function WelcomeOrganizerScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('../assets/images/bg.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animatable.Text
          animation="fadeInDown"
          duration={1200}
          style={styles.title}
        >
          Добро пожаловать, организатор!
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          delay={600}
          duration={1200}
          style={styles.subtitle}
        >
          Ваши идеи меняют мир студентов
        </Animatable.Text>
        <Animatable.View
          animation="bounceIn"
          delay={1200}
          style={styles.emojiBox}
        >
          <Text style={styles.emoji}>🎉</Text>
        </Animatable.View>
        <Animatable.View animation="fadeIn" delay={1800}>
          <TouchableOpacity style={styles.btn} onPress={() => router.replace('/OrganizationMainMenu')}>
            <Text style={styles.btnText}>Начать</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30,30,158,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffe747',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  emojiBox: {
    marginBottom: 32,
    marginTop: 8,
  },
  emoji: {
    fontSize: 54,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 38,
    paddingVertical: 14,
    marginTop: 12,
    elevation: 3,
  },
  btnText: {
    color: '#1e1e9e',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.2,
  },
});