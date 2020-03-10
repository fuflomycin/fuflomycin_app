import React from 'react';
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
import {Drug} from './db';

import AutoHeightWebView from 'react-native-autoheight-webview';

const assets = 'https://fuflomycin.github.io/fuflomycin/img/';

const DrugItem = () => {
  //
  const {navigate, getParam, goBack} = useNavigation();

  //
  const drug: Drug = getParam('drug');
  console.log('Drug:', drug);

  const {width, height} = Dimensions.get('window');

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
            // goBack();
            navigate('DrugList');
          }}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          {drug.title}
        </Text>
      </View>

      {/* Контент */}
      <View style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView>
        {// Фото
        drug.photo && (
          <Image
            source={{uri: `${assets}${drug.photo}`}}
            style={{height: 150, resizeMode: 'contain'}}
          />
        )}

        {/* Название */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 16, fontWeight: 'bold', padding: 10, flex: 1}}>
            {drug.title}
          </Text>
          {drug.source && (
            <TouchableOpacity
              onPress={() => {
                // goBack();
                if (drug.source) {
                  Linking.openURL(drug.source);
                }
              }}
              style={{marginEnd: 10}}>
              <Icon name="link" size={30} color="#5959ff" />
            </TouchableOpacity>
          )}
        </View>

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

          {/* Контент */}
          {/* <WebView
            style={{width: width - 20, height: 300}}
            originWhitelist={['*']}
            textZoom={width / 1.5}
            source={{
              html: drug.contents,
            }}
            onShouldStartLoadWithRequest={req => {
              Linking.openURL(req.url);
              return false;
            }}
          /> */}
          <AutoHeightWebView
            style={{width: width - 20}}
            source={{html: drug.contents}}
            scalesPageToFit={true}
            viewportContent={'width=device-width, user-scalable=no'}
            onShouldStartLoadWithRequest={event => {
              if (event.url.slice(0,4) === 'http') {
                Linking.openURL(event.url)
                return false
              }
              return true
            }}
            originWhitelist={['*']}
          />
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
    </View>
  );
};

export default DrugItem;
