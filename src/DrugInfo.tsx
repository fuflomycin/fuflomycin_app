import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrugInfo = () => {
  //
  const {navigate, getParam} = useNavigation();

  //
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      {/* Статус бар */}
      <StatusBar backgroundColor="#ff5959" barStyle="light-content" />

      {/* Верхняя панель */}
      <View
        style={{
          height: 50,
          backgroundColor: '#ff5959',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigate('DrugList');
          }}>
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          О программе
        </Text>
      </View>

      {/* Контент */}
      <ScrollView style={{padding: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>О программе</Text>
        <Text>Справочник содержит неполный список "фуфломицинов":</Text>
        <Text style={{color: 'orange'}}>
          - препаратов с недоказанной эффективностью (РСП - расстрельный список
          препаратов Никиты Жукова)
        </Text>
        <Text style={{marginBottom: 10, color: 'red'}}>
          - гомеопатических препаратов
        </Text>
        <Text>
          Список сформирован на основе отсутствия убедительных данных об
          эффективности препаратов по заявленным показаниям, как того требует
          доказательная медицина, а так же по отсутствию в авторитетных
          источниках и рекомендациях.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrugInfo;
