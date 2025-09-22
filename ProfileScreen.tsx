import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [editName, setEditName] = React.useState('al1kent1y');
  const [editRole, setEditRole] = React.useState('Ученик');
  const [editLang, setEditLang] = React.useState('Русский');
  const roles = ['Ученик', 'Профи', 'Любитель', 'Пикми', 'Мастер', 'Легенда'];

  const profile = {
    name: editName,
    role: editRole,
    avatar: require('../assets/images/profilepic.jpg'),
    stats: [
      { label: 'Серия', value: 3 },
      { label: 'Кредитов', value: 71710 },
    ],
    lessons: 5,
    achievements: [
      { icon: require('../assets/images/medal1.png'), date: '12.07.2025', unlocked: true },
      { icon: require('../assets/images/medal2.png'), date: '', unlocked: false },
      { icon: require('../assets/images/medal3.png'), date: '', unlocked: false },
      { icon: require('../assets/images/medal1.png'), date: '', unlocked: false },
    ],
  };

  return (
    <View style={styles.bg}>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Image source={profile.avatar} style={styles.avatar} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.role}>{profile.role}</Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/images/settings.png')} style={{ width: 26, height: 26, tintColor: '#836fff' }} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          {profile.stats.map((stat, idx) => {
            // Мягкие цвета для карточек
            const bgColors = ['#7c9aff', '#6ed6c9'];
            return (
              <View
                key={idx}
                style={[styles.statCard, { backgroundColor: bgColors[idx % bgColors.length], shadowColor: bgColors[idx % bgColors.length] }]}
              >
                <Text style={styles.statValueColored}>{stat.value}</Text>
                <Text style={styles.statLabelColored}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.lessonsCard}>
          <Image source={require('../assets/images/eventhub_logo.png')} style={{ width: 32, height: 32, marginRight: 10 }} />
          <View>
            <Text style={styles.lessonsValue}>{profile.lessons}</Text>
            <Text style={styles.lessonsLabel}>Количество мероприятий</Text>
          </View>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakInactive}>Стрик неактивен</Text>
          <Text style={styles.streakStart}>начните прямо сейчас</Text>
          <View style={styles.streakBarBg}>
            <View style={styles.streakBarFg} />
          </View>
        </View>

        <Text style={styles.achievementsTitle}>Достижения</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 18}} contentContainerStyle={{gap: 12, paddingRight: 8}}>
          {profile.achievements.map((ach, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.achievementSwipeBox, !ach.unlocked && styles.achievementLocked]}
              activeOpacity={ach.unlocked ? 0.7 : 1}
            >
              <Image source={ach.icon} style={[styles.achievementIcon, !ach.unlocked && {opacity: 0.3}]} />
              <Text style={styles.achievementDate}>{ach.date ? ach.date : 'Не получено'}</Text>
              {!ach.unlocked && <Text style={styles.achievementGetBtn}>Получить</Text>}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Модальное окно для настроек */}
        <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Настройки профиля</Text>
              <Text style={styles.modalLabel}>Язык интерфейса</Text>
              <View style={styles.langRow}>
                {['Русский', 'English'].map(lang => (
                  <TouchableOpacity key={lang} style={[styles.langBtn, editLang === lang && styles.langBtnActive]} onPress={() => setEditLang(lang)}>
                    <Text style={[styles.langBtnText, editLang === lang && styles.langBtnTextActive]}>{lang}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.modalLabel}>Никнейм</Text>
              <TextInput style={styles.input} value={editName} onChangeText={setEditName} />
              <Text style={styles.modalLabel}>Звание</Text>
              <View style={styles.rolesRow}>
                {roles.map(role => (
                  <TouchableOpacity key={role} style={[styles.roleBtn, editRole === role && styles.roleBtnActive]} onPress={() => setEditRole(role)}>
                    <Text style={[styles.roleBtnText, editRole === role && styles.roleBtnTextActive]}>{role}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.saveBtn} onPress={() => setModalVisible(false)}>
                <Text style={{color:'#fff', fontWeight:'bold'}}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.inviteBtn} activeOpacity={0.85} onPress={() => {}}>
          <Text style={styles.inviteBtnText}>Пригласить друзей</Text>
        </TouchableOpacity>
        <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/MainMenu')}>
                  <Text style={styles.tabText}>Главная</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/main-feed')}>
                  <Text style={styles.tabText}>Ивенты дня</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBtn} onPress={() => router.push('/map')}>
                  <Text style={styles.tabText}>Карта</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabBtn}>
                  <Text style={styles.tabTextActive}>Профиль</Text>
                </TouchableOpacity>
              </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  inviteBtn: {
    backgroundColor: '#1e1e9e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#1e1e9e',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  inviteBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
    paddingHorizontal: 18,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  role: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  settingsBtn: {
    marginLeft: 'auto',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
    borderWidth: 1.5,
    borderColor: '#836fff',
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 10,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 2,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  statValueColored: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  statLabelColored: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.92,
  },
  lessonsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  lessonsValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  lessonsLabel: {
    color: '#fff',
    fontSize: 13,
  },
  streakCard: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },
  streakInactive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  streakStart: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 8,
  },
  streakBarBg: {
    height: 8,
    backgroundColor: '#444',
    borderRadius: 6,
    width: '100%',
    marginTop: 2,
    overflow: 'hidden',
  },
  streakBarFg: {
    height: 8,
    width: '0%',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    marginTop: 8,
  },
  achievementSwipeBox: {
    width: 120,
    height: 120,
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 0,
    padding: 10,
    elevation: 2,
    shadowColor: '#222',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  achievementLocked: {
    backgroundColor: '#e0e0e0',
    borderColor: '#bbb',
  },
  achievementDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    marginBottom: 2,
  },
  achievementGetBtn: {
    marginTop: 4,
    color: '#aaa',
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
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
    padding: 24,
    width: 320,
    elevation: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#836fff',
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#836fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    width: 220,
    marginBottom: 6,
    backgroundColor: '#f7f7ff',
    color: '#222',
  },
  langRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  langBtn: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  langBtnActive: {
    backgroundColor: '#836fff',
  },
  langBtnText: {
    color: '#888',
    fontWeight: 'bold',
  },
  langBtnTextActive: {
    color: '#fff',
  },
  rolesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  roleBtn: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 4,
  },
  roleBtnActive: {
    backgroundColor: '#836fff',
  },
  roleBtnText: {
    color: '#888',
    fontWeight: 'bold',
  },
  roleBtnTextActive: {
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: '#836fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 12,
  },
  tabBar: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 76,
  backgroundColor: '#fff',
  flexDirection: 'row',
  borderTopWidth: 1,
  borderTopColor: '#eee',
  justifyContent: 'space-around',
  alignItems: 'center',
  zIndex: 10,
  paddingBottom: 24,
  borderTopLeftRadius: 22,
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
});