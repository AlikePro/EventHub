import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EventConfirmationScreen() {
  const router = useRouter();
  const { address } = useLocalSearchParams(); // Получение адреса

  const eventTypes = ['Стажировка', 'Волонтерство', 'Форум', 'Дебаты', 'Хакатон', 'Марафон'];

  const [eventData, setEventData] = useState({
    eventType: 'Стажировка',
    description: 'Описание мероприятия',
  });

  const [pickerVisible, setPickerVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false); // Состояние для модального окна

  const handleConfirm = () => {
    console.log('Мероприятие подтверждено:', { address, ...eventData });
    setConfirmationVisible(true); // Показать модальное окно
  };

  const closeConfirmation = () => {
    setConfirmationVisible(false); // Закрыть модальное окно
    router.push('/OrganizationMainMenu'); // Переход на главный экран организатора
  };

  const handleEdit = () => {
    router.push('/OrgMainMenu'); // Вернуться на предыдущий экран для редактирования
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Подтверждение мероприятия</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Адрес:</Text>
        <Text style={styles.value}>{address || 'Адрес не указан'}</Text>

        <Text style={styles.label}>Тип мероприятия:</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setPickerVisible(true)}
        >
          <Text style={styles.pickerButtonText}>{eventData.eventType}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Описание:</Text>
        <TextInput
          style={styles.input}
          value={eventData.description}
          onChangeText={(text) =>
            setEventData({ ...eventData, description: text })
          }
          placeholder="Введите описание"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Подтвердить</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={handleEdit}
      >
        <Text style={styles.buttonText}>Редактировать</Text>
      </TouchableOpacity>

      {/* Модалка выбора типа */}
      <Modal visible={pickerVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={eventTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.pickerItem}
                  onPress={() => {
                    setEventData({ ...eventData, eventType: item });
                    setPickerVisible(false);
                  }}
                >
                  <Text style={styles.pickerItemText}>{item}</Text>
                </Pressable>
              )}
            />
            <TouchableOpacity onPress={() => setPickerVisible(false)}>
              <Text style={styles.cancelText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Модалка подтверждения */}
      <Modal visible={confirmationVisible} animationType="fade" transparent>
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationBox}>
            <Text style={styles.confirmationTitle}>Мероприятие отправлено!</Text>
            <Text style={styles.confirmationMessage}>
              Ваше мероприятие будет одобрено в течение нескольких часов.
            </Text>
            <TouchableOpacity style={styles.confirmationButton} onPress={closeConfirmation}>
              <Text style={styles.confirmationButtonText}>ОК</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 64, paddingHorizontal: 16 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e1e9e',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f7f7ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#444',
    marginBottom: 12,
  },
  pickerButton: {
    borderWidth: 1.5,
    borderColor: '#1e1e9e',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f7f7ff',
  },
  pickerButtonText: {
    fontSize: 15,
    color: '#1e1e9e',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#1e1e9e',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    marginBottom: 12,
    backgroundColor: '#f7f7ff',
    color: '#222',
  },
  button: {
    backgroundColor: '#1e1e9e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#888',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: 300,
  },
  pickerItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#1e1e9e',
    textAlign: 'center',
  },
  cancelText: {
    textAlign: 'center',
    paddingVertical: 14,
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '600',
  },

  // Confirmation Modal Styles
  confirmationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 300,
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e9e',
    marginBottom: 12,
  },
  confirmationMessage: {
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
    marginBottom: 16,
  },
  confirmationButton: {
    backgroundColor: '#1e1e9e',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  confirmationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});