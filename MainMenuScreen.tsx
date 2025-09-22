import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const topics = [
  {
    title: 'Стажировки',
    subtitle: 'Практика, опыт',
    colors: ['#a78bfa', '#3b82f6'],
    icon: require('../assets/images/intern.png'),
  },
  {
    title: 'Волонтерство',
    subtitle: 'Субботники, помощь',
    colors: ['#009A63'],
    icon: require('../assets/images/volo.png'),
  },
  {
    title: 'Форумы',
    subtitle: 'Обсуждения, лекции',
    colors: ['#ffe747', '#f59e42'],
    icon: require('../assets/images/forum.png'),
  },
  {
    title: 'Дебаты',
    subtitle: 'Дискуссии, споры',
    colors: ['#ff4747', '#fb7185'],
    icon: require('../assets/images/debates.png'),
  },
  {
    title: 'Хакатоны',
    subtitle: 'Командные соревнования, программирование',
    colors: ['#1a40ff', '#6366f1'],
    icon: require('../assets/images/hackathon.png'),
  },
  {
    title: 'Марафоны',
    subtitle: 'Здоровье, спорт',
    colors: ['#70ff75', '#444'],
    icon: require('../assets/images/marathon.png'),
  },
];

export default function MainFeedScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const openModal = (text: string) => {
    setModalText(text);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ивенты</Text>
      <View style={styles.tabsRow}>
        <Text style={styles.tabActive}>Главная</Text>
        <TouchableOpacity onPress={() => openModal('Скоро...')}>
          <Text style={styles.tab}>Больше ивентов</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal('Скоро...')}>
          <Text style={styles.tab}>Новые</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{modalText}</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalBtnText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={{ paddingBottom: 32, paddingTop: 32 }}>
        {topics.map((topic, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.card, { backgroundColor: topic.colors[0] }]}
            onPress={() => openModal(topic.title)}
          >
            <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{topic.title}</Text>
                <Text style={styles.cardSubtitle}>{topic.subtitle}</Text>
              </View>
              <View style={styles.iconBox}>
                <Image source={topic.icon} style={styles.cardIcon} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn}>
          <Text style={styles.tabTextActive}>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/main-feed')}>
          <Text style={styles.tabText}>Ивенты дня</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/map')}>
          <Text style={styles.tabText}>Карта</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/profile')}>
          <Text style={styles.tabText}>Профиль</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 32 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 22,
    marginTop: 30,
    marginBottom: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    marginLeft: 22,
    marginBottom: 18,
    gap: 24,
  },
  tabActive: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2563eb',
    borderBottomWidth: 3,
    borderBottomColor: '#2563eb',
    paddingBottom: 2,
    marginRight: 8,
  },
  tab: {
    fontSize: 17,
    color: '#888',
    marginRight: 8,
  },
  soonBox: {
    marginLeft: 22,
    marginBottom: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  soonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 22,
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#222',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: '#f3f3f3',
    fontSize: 15,
    fontWeight: '500',
  },
  iconBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    marginLeft: 18,
    elevation: 2,
    shadowColor: '#222',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardIcon: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, // теперь меню прямо у края
    height: 76, // увеличено
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10,
    paddingBottom: 24, // добавлен паддинг
    borderTopLeftRadius: 22, // скругления
    borderTopRightRadius: 22,
    shadowColor: '#222',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 12,
    elevation: 12,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: '#1e1e9e',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#fff',
    backgroundColor: '#1e1e9e',
    fontWeight: 'bold',
    fontSize: 14,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 32,
    width: 260,
    elevation: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 18,
  },
  modalBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 8,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});