import React from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrugInfo = () => {
  //
  const {goBack, navigate} = useNavigation();

  //
  return (
    <View style={{backgroundColor: '#ff5959', flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
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
              //navigate('DrugList');
              const result = goBack();
              console.log('navigate druglist', result);
            }}>
            <Icon name="chevron-left" size={30} color="#fff" />
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
        <ScrollView
          style={{}}
          contentContainerStyle={{backgroundColor: '#fff', padding: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>О программе</Text>

          {/* Гитхаб */}
          <Text>
            Исходный код программы и базы препаратов доступен на Github
          </Text>
          <View style={{margin: 10}}>
            <Button
              title="Github"
              onPress={() => {
                Linking.openURL('https://github.com/fuflomycin');
              }}
            />
          </View>

          {/* Спасибо */}
          <Text style={{marginTop: 20}}>Поддержать развитие приложения:</Text>
          <View style={{margin: 10}}>
            <Button
              title="Спасибо"
              onPress={() => {
                Linking.openURL('https://boosty.to/bndby');
              }}
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
