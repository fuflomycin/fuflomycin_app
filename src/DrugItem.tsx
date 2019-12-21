import React, {useRef} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WebView from 'react-native-webview';
import {Drug} from './db';
import DrugList from './DrugList';

const assets = 'https://fuflomycin.github.io/fuflomycin/img/';

const DrugItem = () => {
  //
  const {navigate, getParam} = useNavigation();

  //
  const drug: Drug = getParam('drug');
  console.log('Drug:', drug);

  const {width, height} = Dimensions.get('window');

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
          {drug.title}
        </Text>
      </View>

      {/* Контент */}
      <ScrollView>
        {// Фото
        drug.photo && (
          <Image
            source={{uri: `${assets}${drug.photo}`}}
            style={{height: 150, resizeMode: 'contain'}}
          />
        )}

        {/* Название */}
        <Text style={{fontSize: 16, fontWeight: 'bold', padding: 10}}>
          {drug.title}
        </Text>

        {// Другие названия
        drug.other && drug.other.length > 0 && (
          <Text
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              color: 'gray',
            }}>
            {drug.other.join(', ')}
          </Text>
        )}

        {/* Раздел */}
        <View
          style={{padding: 10, borderTopColor: 'silver', borderTopWidth: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="emoticon-sad" size={20} color={drug.label} />
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                paddingBottom: 10,
                paddingLeft: 5,
              }}>
              {drug.section}
            </Text>
          </View>

          <WebView
            style={{width: width - 20, height: 300}}
            originWhitelist={['*']}
            textZoom={280}
            source={{
              html: drug.contents,
            }}
            onShouldStartLoadWithRequest={req => {
              Linking.openURL(req.url);
              return false;
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrugItem;
