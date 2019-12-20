import React from 'react';

import Drug from './Drug';
import {useNavigation} from 'react-navigation-hooks';
import {
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrugItem = () => {
  //
  const {navigate, getParam} = useNavigation();

  //
  const drug: Drug = getParam('drug');

  //
  return (
    <SafeAreaView>
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

        <Text style={{marginLeft: 10, fontSize: 14}}>{drug.title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DrugItem;
