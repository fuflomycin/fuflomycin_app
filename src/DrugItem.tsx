import React, {useCallback} from 'react';
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
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Drug} from './db';

import AutoHeightWebView from 'react-native-autoheight-webview';
import WebView from 'react-native-webview';
import Swiper from 'react-native-swiper';

const assets = 'https://fuflomycin.github.io/fuflomycin/img/';

const DrugItem = () => {
  const {navigate, getParam, goBack} = useNavigation();

  const drug: Drug = getParam('drug');

  const {width, height} = Dimensions.get('window');

  const handleBack = useCallback(() => {
    navigate('DrugList');
  }, []);

  const handleSource = useCallback(() => {
    Linking.openURL(drug.source);
  }, []);

  const handleLoad = useCallback((event) => {
    if (event.url.slice(0, 4) === 'http') {
      Linking.openURL(event.url);
      return false;
    }
    return true;
  }, []);

  //
  return (
    <View style={styles.base}>
      <SafeAreaView style={styles.safeArea}>
        {/* Статус бар */}
        <StatusBar backgroundColor="#ff5959" barStyle="light-content" />

        {/* Верхняя панель */}
        <View style={styles.topPanel}>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.topPanelLabel}>{drug.title}</Text>
        </View>

        {/* Контент */}
        <View style={styles.content}>
          {
            // Фото
            drug.gallery && drug.gallery.length > 1 ? (
              <Swiper
                showsButtons
                containerStyle={styles.galleryContainer}
                paginationStyle={styles.galleryPagination}>
                {drug.gallery.map((galleryItem, key) => (
                  <View key={key}>
                    <Image
                      source={{uri: `${assets}${galleryItem}`}}
                      style={styles.photo}
                    />
                  </View>
                ))}
              </Swiper>
            ) : (
              drug.photo && (
                <Image
                  source={{uri: `${assets}${drug.photo}`}}
                  style={styles.photo}
                />
              )
            )
          }
          {/* Название */}
          <View style={styles.title}>
            <Text style={styles.titleLabel}>{drug.title}</Text>
            {drug.source && (
              <TouchableOpacity onPress={handleSource} style={styles.titleLink}>
                <Icon name="link" size={30} color="#5959ff" />
              </TouchableOpacity>
            )}
          </View>

          {
            // Другие названия
            drug.other && drug.other.length > 0 && (
              <Text style={styles.titleOther}>{drug.other.join(', ')}</Text>
            )
          }

          {/* Раздел */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Icon name="emoticon-sad" size={20} color={drug.label} />
              <Text style={styles.sectionLabel}>{drug.section}</Text>
            </View>

            {/* Контент */}
            {/* <WebView
                style={{width: width - 20, height: '100%'}}
                originWhitelist={['*']}
                textZoom={width / 1.5}
                source={{
                  html: drug.contents,
                }}
                onShouldStartLoadWithRequest={(req) => {
                  Linking.openURL(req.url);
                  return false;
                }}
              /> */}
            <AutoHeightWebView
              style={{width: width - 20}}
              source={{html: drug.contents}}
              scalesPageToFit={true}
              viewportContent={'width=device-width, user-scalable=no'}
              onShouldStartLoadWithRequest={handleLoad}
              originWhitelist={['*']}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DrugItem;

const styles = StyleSheet.create({
  base: {backgroundColor: '#ff5959', flex: 1},
  safeArea: {flex: 1},
  topPanel: {
    height: 50,
    backgroundColor: '#ff5959',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topPanelLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {backgroundColor: '#fff', flex: 1},
  photo: {height: 150, resizeMode: 'contain'},
  galleryContainer: {
    maxHeight: 150,
  },
  galleryPagination: {bottom: 0},
  //
  title: {flexDirection: 'row', alignItems: 'center'},
  titleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    flex: 1,
  },
  titleLink: {marginEnd: 10},
  titleOther: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    color: 'gray',
  },
  //
  section: {
    padding: 10,
    borderTopColor: 'silver',
    borderTopWidth: 1,
    flex: 1,
  },
  sectionTitle: {flexDirection: 'row'},
  sectionLabel: {
    color: '#000',
    fontSize: 16,
    paddingBottom: 10,
    paddingLeft: 5,
  },
});
