import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const BUTTON_WIDTH = width * 0.8;
  const SLIDE_LIMIT = BUTTON_WIDTH - 56;

  const slideX = useRef(new Animated.Value(0)).current;
  const [fillWidth, setFillWidth] = useState(56); // 👈 ширина заливки

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx >= 0 && gesture.dx <= SLIDE_LIMIT) {
          slideX.setValue(gesture.dx);
          setFillWidth(gesture.dx + 56); // 👈 ширина заливки увеличивается
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SLIDE_LIMIT - 20) {
          Animated.timing(slideX, {
            toValue: SLIDE_LIMIT,
            duration: 100,
            useNativeDriver: true,
          }).start(() => {
            router.push('/role-selection');
            slideX.setValue(0);
            setFillWidth(56);
          });
        } else {
          Animated.spring(slideX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          setFillWidth(56); // сброс заливки
        }
      },
    })
  ).current;

  return (
    
    <View style={styles.container}>
      <Image
        source={require('../assets/images/eventhub_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>EVENT HUB</Text>
      <Text style={styles.subtitle}>
        Все возможности —{`\n`}на одной платформе!
      </Text>

      <View style={[styles.swipeButton, { width: BUTTON_WIDTH }]}>
        {/* НЕанимированный фон — растёт от fillWidth */}
        <View style={[styles.fillBackground, { width: fillWidth }]} />

        <Text style={styles.buttonText}>НАЧАТЬ</Text>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.slider,
            {
              transform: [{ translateX: slideX }],
            },
          ]}
        >
          <Text style={styles.arrow}>→</Text>
        </Animated.View>
      </View>

      <Text style={styles.swipeText}>Свайпните стрелку вправо для начала</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e1e9e',
    marginBottom: 8,
    letterSpacing: 2,
    textShadowColor: '#b3b3ff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  swipeButton: {
    height: 56,
    backgroundColor: '#1e1e9e',
    borderRadius: 30,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  fillBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#3a3aff',
    borderRadius: 30,
    zIndex: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    zIndex: 1,
  },
  slider: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 56,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  arrow: {
    fontSize: 22,
    color: '#1e1e9e',
    fontWeight: 'bold',
  },
  swipeText: {
    fontSize: 14,
    color: '#666',
  },
});
