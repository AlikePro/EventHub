import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<'student' | 'organization' | null>(null);

  const handleSelect = (role: 'student' | 'organization') => {
    setSelected(role);
  };

  const handleContinue = () => {
    if (selected === 'student') router.push('/register-profile');
    if (selected === 'organization') router.push('/register-organization');
  };

  return (
    <View style={styles.container}>
      {/* Меню или статус-бар можно разместить здесь, если нужно */}
      <View style={styles.content}>
        <Image source={require('../assets/images/eventhub_logo.png')} style={styles.logo} />
        <Text style={styles.title}>Кем вы являетесь?</Text>
        <View style={styles.rolesColumn}>
          <TouchableOpacity
            style={[styles.roleBox, selected === 'student' && styles.selectedBox]}
            onPress={() => handleSelect('student')}
            activeOpacity={0.85}
          >
            <Image source={require('../assets/images/student.png')} style={styles.roleIcon} />
            <Text style={styles.roleText}>Школьник/Студент</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleBox, selected === 'organization' && styles.selectedBox]}
            onPress={() => handleSelect('organization')}
            activeOpacity={0.85}
          >
            <Image source={require('../assets/images/organization.png')} style={styles.roleIcon} />
            <Text style={styles.roleText}>Организация</Text>
          </TouchableOpacity>
        </View>
        {selected && (
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueText}>Продолжить</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 110, // смещение содержимого вниз
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e1e9e',
    marginBottom: 32,
  },
  rolesColumn: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 36,
  },
  roleBox: {
    width: 250,
    height: 120,
    borderWidth: 2,
    borderColor: '#1e1e9e',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingHorizontal: 18,
    shadowColor: '#1e1e9e',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  selectedBox: {
    backgroundColor: '#e6eaff',
    borderColor: '#3a3ad6',
    shadowOpacity: 0.13,
    elevation: 4,
  },
  roleIcon: {
    width: 54,
    height: 54,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  roleText: {
    fontSize: 18,
    color: '#222',
    fontWeight: '600',
    textAlign: 'center',
  },
  continueBtn: {
    backgroundColor: '#1e1e9e',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 44,
    marginTop: 18,
    elevation: 2,
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
});