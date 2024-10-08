import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackParamList} from './App';

type DrugInfoProps = NativeStackScreenProps<StackParamList, 'DrugInfo'>;

const DrugInfo = ({navigation}: DrugInfoProps) => {
  const {goBack} = navigation;

  const handleBack = useCallback(() => goBack(), [goBack]);

  //
  return (
    <View style={styles.base}>
      <SafeAreaView style={styles.safeArea}>
        {/* Статус бар */}
        <StatusBar backgroundColor="#ff5959" barStyle="light-content" />

        {/* Верхняя панель */}
        <View style={styles.panel}>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.panelLabel}>О программе</Text>
        </View>

        {/* Контент */}
        <ScrollView
          contentContainerStyle={{backgroundColor: '#fff', padding: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>О программе</Text>

          {/* Гитхаб */}
          <Text>
            Исходный код программы и базы препаратов доступен на Github
          </Text>
          <View style={{margin: 10}}>
            <Button
              title="Исходники"
              onPress={() => Linking.openURL('https://github.com/fuflomycin')}
            />
          </View>

          {/* Спасибо */}
          <Text style={{marginTop: 20}}>Поддержать развитие приложения:</Text>
          <View style={{margin: 10}}>
            <Button
              title="Поддержать"
              onPress={() => Linking.openURL('https://boosty.to/bndby')}
            />
          </View>

          {/* О справочнике */}
          <Text style={{marginTop: 20}}>
            Справочник содержит неполный список "фуфломицинов":
          </Text>
          <Text style={{color: 'orange'}}>
            - препаратов с недоказанной эффективностью (РСП - расстрельный
            список препаратов Никиты Жукова)
          </Text>
          <Text style={{marginBottom: 10, color: 'red'}}>
            - гомеопатических препаратов
          </Text>
          <Text style={{marginBottom: 10, color: 'red'}}>
            - негативный перечень Формулярного комитета РАМН
          </Text>
          <Text style={{marginBottom: 10}}>
            Список сформирован на основе отсутствия убедительных данных об
            эффективности препаратов по заявленным показаниям, как того требует
            доказательная медицина, а так же по отсутствию в авторитетных
            источниках и рекомендациях.
          </Text>

          {/* Легенда */}
          <Text style={{marginBottom: 10, fontWeight: 'bold'}}>Легенда</Text>
          <Text style={{marginBottom: 10}}>
            РСП — Расстрельный список препаратов. Составлен врачом Никитой
            Жуковым.
          </Text>
          <Text style={{marginBottom: 10}}>
            Cochrane, Pubmed, FDA, RXlist — авторитетные источники информации об
            исследованиях или препаратах, конечно, это не все, но наиболее
            известные, они индексируют подавляющее большинство работ как
            высокого качества, так и не очень.
          </Text>
          <Text style={{marginBottom: 10}}>
            ВОЗ — всемирная организация здравоохранения, держит руку на пульсе
            по данным о лечении
          </Text>
          <Text style={{marginBottom: 10}}>
            ЖНВЛП — российский перечень жизненно необходимых и важнейших
            лекарственных препаратов, куда попадают как нормальные лекарства,
            так и бесполезные, потому что таблетки из этого перечня сбывать
            намного легче: это государственное лобби.
          </Text>
          <Text style={{marginBottom: 10}}>
            РКИ — рандомизированное клиническое исследование, оплот
            доказательной медицины; у некоторых фуфломицинов находится парочка
            таковых, но доказательств они не прибавляют, обычно по причине
            плохого качества.
          </Text>
          <Text style={{marginBottom: 10}}>
            РЛС — регистр лекарственных средств России
          </Text>
          <Text style={{marginBottom: 10}}>
            ФК — формулярный комитет РАМН, наиболее здравомыслящий проект
            минздрава
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DrugInfo;

const styles = StyleSheet.create({
  base: {backgroundColor: '#ff5959', flex: 1},
  safeArea: {flex: 1},
  panel: {
    height: 50,
    backgroundColor: '#ff5959',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  panelLabel: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
