import React, {useEffect, useRef, useState} from 'react';
import {
  Container,
  Title,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Body,
  Subtitle,
  List,
  Text,
  ListItem,
  Right,
  View,
  Card,
  CardItem,
  Left,
  Badge,
  Thumbnail,
} from 'native-base';
import {WebView} from 'react-native-webview';

import Drug from './Drug';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {SafeAreaView, ScrollView} from 'react-navigation';
import {TextInput, Image, StatusBar} from 'react-native';

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

  /**
   * Navigation
   */
  const {navigate} = useNavigation();

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
      <StatusBar backgroundColor="#900" barStyle="light-content" />
      <View
        style={{
          height: 50,
          backgroundColor: 'silver',
          padding: 10,
          flexDirection: 'row',
        }}>
        <Image
          style={{width: 20, height: 20}}
          source={require('./search.png')}
        />
        <TextInput
          style={{borderColor: 'gray', borderWidth: 1, flex: 1}}
          value={prompt}
          onChangeText={newPrompt => {
            const p = newPrompt.toLocaleUpperCase();
            setResults([...drugs.filter(i => i.index.includes(p))]);
            setPrompt(newPrompt);
          }}
        />
      </View>
      <ScrollView>
        <List>
          {results.map((drug: Drug) => (
            <ListItem
              noIndent
              key={drug.id}
              onPress={() => {
                console.log('Go to drug', drug.id);
                navigate('DrugItem', {drug});
              }}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{drug.title}</Text>
                  <Text style={{color: drug.label}} note>
                    {drug.section}
                  </Text>
                </View>
                {drug && drug.other && drug.other.length > 0 && (
                  <View>
                    <Text note>{drug.other?.join(', ')}</Text>
                  </View>
                )}
              </View>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrugList;
