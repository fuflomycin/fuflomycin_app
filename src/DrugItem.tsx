import React, {useState} from 'react';

import Drug from './Drug';
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
  Modal,
  TouchableHighlight,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WebView from 'react-native-webview';

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
      <StatusBar backgroundColor="#900" barStyle="light-content" />
      <View
        style={{
          height: 50,
          backgroundColor: 'silver',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigate('DrugList');
          }}>
          <Icon name="arrow-left" size={24} color="#900" />
        </TouchableOpacity>

        <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
          {drug.title}
        </Text>
      </View>
      <ScrollView>
        {drug.photo && (
          <Image
            source={{uri: `${assets}${drug.photo}`}}
            style={{height: 150, resizeMode: 'contain'}}
          />
        )}

        <Text style={{fontSize: 16, fontWeight: 'bold', padding: 10}}>
          {drug.title}
        </Text>
        {drug.other && drug.other.length > 0 && (
          <Text style={{paddingLeft: 10, paddingRight: 10, color: 'gray'}}>
            {drug.other.join(', ')}
          </Text>
        )}

        <View style={{backgroundColor: drug.label, padding: 10}}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              paddingBottom: 10,
            }}>
            {drug.section}
          </Text>

          <View
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
            }}>
            <WebView
              style={{width: width - 40, height: 300}}
              originWhitelist={['*']}
              textZoom={280}
              source={{
                html: drug.contents,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrugItem;
