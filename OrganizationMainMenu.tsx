import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
const categories = [
  { title: 'Стажировки', count: 0, color: '#7c9aff', icon: require('../assets/images/intern.png') },
  { title: 'Волонтерство', count: 0, color: '#4ade80', icon: require('../assets/images/volo.png') },
  { title: 'Форумы', count: 0, color: '#fde047', icon: require('../assets/images/forum.png') },
  { title: 'Дебаты', count: 0, color: '#f87171', icon: require('../assets/images/debates.png') },
  { title: 'Хакатоны', count: 0, color: '#818cf8', icon: require('../assets/images/hackathon.png') },
  { title: 'Марафоны', count: 0, color: '#34d399', icon: require('../assets/images/marathon.png') },
];

export default function OrganizationMainMenu() {
    const router = useRouter();
    const profile = {
    name: 'EventHub',
    sphere: 'Волонтерство и образование',
    avatar: require('../assets/images/eventhub_logo.png'),
    totalEvents: categories.reduce((sum, c) => sum + c.count, 0),
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={profile.avatar} style={styles.avatar} />
        <View style={{ marginLeft: 14 }}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.sphere}>{profile.sphere}</Text>
        </View>
      </View>
      <View style={styles.statsCard}>
        <Text style={styles.statsValue}>{profile.totalEvents}</Text>
        <Text style={styles.statsLabel}>Всего мероприятий</Text>
      </View>
      <Text style={styles.sectionTitle}>Категории мероприятий</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {categories.map((cat, idx) => (
          <View key={idx} style={[styles.catCard, { backgroundColor: cat.color + '22' }]}>
            <View style={styles.catLeft}>
              <Image source={cat.icon} style={styles.catIcon} />
              <View>
                <Text style={styles.catTitle}>{cat.title}</Text>
                <Text style={styles.catCount}>{cat.count} мероприятий</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.catBtn, { backgroundColor: cat.color }]}>
              <Text style={styles.catBtnText}>Подробнее</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/OrganizerScreen')}>
        <Text style={styles.addBtnText}>+ Добавить мероприятие</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 36, paddingHorizontal: 18 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#eee' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1e1e9e' },
  sphere: { fontSize: 14, color: '#888', marginTop: 2 },
  statsCard: {
    backgroundColor: '#f3f3ff',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#1e1e9e',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  statsValue: { color: '#1e1e9e', fontWeight: 'bold', fontSize: 28, marginBottom: 2 },
  statsLabel: { color: '#1e1e9e', fontSize: 15, fontWeight: '600', opacity: 0.92 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 10, marginTop: 8 },
  catCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  catLeft: { flexDirection: 'row', alignItems: 'center' },
  catIcon: { width: 38, height: 38, borderRadius: 8, marginRight: 14 },
  catTitle: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  catCount: { fontSize: 13, color: '#888', marginTop: 2 },
  catBtn: {
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  addBtn: {
    backgroundColor: '#1e1e9e',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#1e1e9e',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 0.2 },
});