import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const eventDetails = {
  'astana-hub': {
    title: 'Astana Hub',
    image: require('../assets/images/astanahubinside.webp'),
    rating: '4.8 / 5.0',
    reviews: '37 отзывов',
    desc: 'Astana Hub — крупнейший международный технопарк стартапов в Центральной Азии. Здесь вы можете пройти стажировку в сфере IT, получить опыт работы в инновационной среде, познакомиться с ведущими экспертами и поучаствовать в реальных проектах.',
    section: 'Стажировка: Аналитик данных',
    details: 'Требования:\nВозраст: 18+\nСтудент или выпускник технической специальности\nБазовые знания Python/SQL\nКоличество мест: 15\nСвободных мест: 4\nСтажировка оплачиваемая, по итогам возможен оффер на работу.'
  },
  'astana-zhastary': {
    title: 'Астана Жастары',
    image: require('../assets/images/astana_zhastary.jpg'),
    rating: '4.9 / 5.0',
    reviews: '52 отзыва',
    desc: 'Мероприятия, проводимые организацией "Астана Жастары", направлены на развитие молодежных инициатив, волонтерство и поддержку городских проектов. Присоединяйтесь к команде активных и неравнодушных!',
    section: 'Волонтерство: Субботник',
    details: 'Требования:\nВозраст 14+\nПроживание в Астане\nРазрешение от опекунов\nКоличество мест: 250\nСвободных мест: 72\nЗа участие предоставляется: Сертификат; Возможность работать в более крупных ивентах'
  },
  'phoenix-mun': {
    title: 'Phoenix MUN',
    image: require('../assets/images/muninside.webp'),
    rating: '4.7 / 5.0',
    reviews: '19 отзывов',
    desc: 'Phoenix MUN — это ежегодная модель ООН для старшеклассников и студентов. Участники погружаются в работу международных комитетов, развивают навыки публичных выступлений, дипломатии и критического мышления.',
    section: 'Модель ООН: Phoenix MUN 2025',
    details: 'Требования:\nВозраст: 16+\nВладение английским языком\nИнтерес к международным отношениям\nКоличество мест: 120\nСвободных мест: 18\nЛучшие участники получают дипломы и призы.'
  }
};

export default function EventDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  let eventId = 'astana-zhastary';
  if (typeof id === 'string') eventId = id;
  else if (Array.isArray(id) && id.length > 0) eventId = id[0];
  const event = eventDetails[eventId as keyof typeof eventDetails] || eventDetails['astana-zhastary'];
  return (
    <View style={styles.container}>
      <Image source={event.image} style={styles.bgImage} />
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backIcon}>{'\u25C0'}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.detailsCard} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingText}>{event.rating}</Text>
          <Text style={styles.ratingCount}>{event.reviews}</Text>
        </View>
        <Text style={styles.eventDesc}>{event.desc}</Text>
        <Text style={styles.sectionTitle}>{event.section}</Text>
        <Text style={styles.eventDesc}>{event.details}</Text>
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  bgImage: { width: '100%', height: 220, resizeMode: 'cover' },
  backBtn: { position: 'absolute', top: 30, left: 18, zIndex: 10, backgroundColor: '#fff', borderRadius: 30, padding: 8, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
  backIcon: { fontSize: 28, color: '#1e1e9e', fontWeight: 'bold' },
  detailsCard: { position: 'absolute', top: 180, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 8 },
  eventTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e1e9e', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  ratingStar: { color: '#FFD700', fontSize: 20, marginRight: 4 },
  ratingText: { fontSize: 16, color: '#444', marginRight: 8 },
  ratingCount: { fontSize: 14, color: '#888' },
  eventDesc: { fontSize: 15, color: '#222', marginBottom: 10 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#1e1e9e', marginTop: 12, marginBottom: 4 },
  registerBtn: { backgroundColor: '#1e1e9e', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginTop: 18 },
  registerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
