import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';

import Drug from './Drug';
import {useNavigation} from 'react-navigation-hooks';
import {SafeAreaView, ScrollView, NavigationEvents} from 'react-navigation';

import {
  TextInput,
  StatusBar,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Item: React.FC<{drug: Drug}> = ({drug}) => {
  /**
   * Navigation
   */
  const {navigate} = useNavigation();

  //
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('DrugItem', {drug});
      }}>
      <View
        style={{
          padding: 10,
          borderBottomColor: 'silver',
          borderBottomWidth: 1,
          borderLeftColor: drug.label,
          borderLeftWidth: 3,
        }}>
        <Text style={{fontSize: 14}}>{drug.title}</Text>
        {drug.other && drug.other?.length > 0 && (
          <Text style={{color: 'gray'}}>{drug.other}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

/**
 *
 */
const DrugList = () => {
  // drugs sourse
  const homeopathyUrl = `https://fuflomycin.github.io/fuflomycin/homeopathy.json`;
  const rspUrl = 'https://fuflomycin.github.io/fuflomycin/rsp.json';

  // all drugs
  const [drugs, setDrugs] = useState<Drug[]>([]);

  // prompt string
  const [prompt, setPrompt] = useState('');

  // filtered drugs results
  const [results, setResults] = useState<Drug[]>([]);

  /**
   *
   */
  const searchRef = useRef(null);

  /* useEffect(() => {
    searchRef.current.focus();
  }, []); */

  /**
   * Load all drugs from github
   */
  useEffect(() => {
    // console.log('First start');
    (async () => {
      // homeopathy
      const homeopathyRaw = await fetch(homeopathyUrl);
      const homeopathy = await homeopathyRaw.json();

      const rspRaw = await fetch(rspUrl);
      const rsp = await rspRaw.json();

      let result = [];
      for (let i in homeopathy) result.push({i, ...homeopathy[i]});
      for (let i in rsp) result.push({i, ...rsp[i]});

      //
      for (let i in result) {
        result[i].index = (
          result[i].title +
          ', ' +
          result[i].other.join(', ')
        ).toLocaleUpperCase();
      }

      // console.log(result);

      //
      result.sort((a: Drug, b: Drug) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });

      //
      setDrugs([...result]);
      setResults([...result]);
      setPrompt('');
    })();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#ff5959" barStyle="light-content" />
      <View
        style={{
          height: 50,
          backgroundColor: '#ff5959',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon name="magnify" size={30} color="#fff" />
        <TextInput
          style={{
            borderColor: '#ef4949',
            borderWidth: 1,
            flex: 1,
            backgroundColor: '#fff',
            marginLeft: 10,
            borderRadius: 3,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 3,
            paddingBottom: 3,
          }}
          value={prompt}
          onChangeText={newPrompt => {
            const p = newPrompt.toLocaleUpperCase();
            setResults([...drugs.filter(i => i.index.includes(p))]);
            setPrompt(newPrompt);
          }}
        />
      </View>
      <View>
        <FlatList
          data={results}
          renderItem={({item}) => <Item drug={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default DrugList;
