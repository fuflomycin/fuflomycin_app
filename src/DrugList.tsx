import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {SafeAreaView} from 'react-navigation';

import {
  TextInput,
  StatusBar,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  getDataFromStorage,
  getDataFromGithub,
  saveDataToStorage,
  Drug,
} from './db';

const Item = ({drug}: Drug) => {
  const {navigate} = useNavigation();

  const handleItem = useCallback(() => navigate('DrugItem', {drug}), []);

  //
  return (
    <TouchableOpacity onPress={handleItem}>
      <View style={itemStyles.item}>
        <View style={{flex: 15}}>
          <Text style={{fontSize: 14}}>{drug.title}</Text>
          {drug.otherstr ? (
            <Text style={{color: 'gray'}}>{drug.otherstr}</Text>
          ) : null}
        </View>
        <View style={{flex: 1}}>
          <Icon name="chevron-right" size={24} color="#ff5959" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
  },
});

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

  // loading
  const [loading, setLoading] = useState(true);

  //
  const {navigate} = useNavigation();

  /**
   * Load all drugs from github
   */
  useEffect(() => {
    (async () => {
      //
      const storedDrugs = await getDataFromStorage();
      if (storedDrugs) {
        // drugs found in async storage
        setDrugs([...storedDrugs]);
        setResults([...storedDrugs]);
        setLoading(false);
      }

      const loadedDrugs = await getDataFromGithub();
      // console.log('Loaded drugs', loadedDrugs);
      if (loadedDrugs) {
        setDrugs([...loadedDrugs]);
        if (prompt === '') {
          setResults([...loadedDrugs]);
          setLoading(false);
        }
        await saveDataToStorage(loadedDrugs);
      }
    })();
  }, []);

  const handleInfo = useCallback(() => {
    navigate('DrugInfo');
  }, []);

  const handleInput = newPrompt => {
    const p = newPrompt.toLocaleUpperCase();
    setResults([...drugs.filter(i => i.index.includes(p))]);
    setPrompt(newPrompt);
  };

  return (
    <View style={styles.base}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#ff5959" barStyle="light-content" />
        <View style={styles.panel}>
          {loading ? (
            <ActivityIndicator size={30} color="#fff" />
          ) : (
            <View>
              <Icon name="magnify" size={24} color="#fff" />
              <Text style={{color: '#fff', fontSize: 10}}>
                {results.length}
              </Text>
            </View>
          )}

          <TextInput
            style={styles.prompt}
            value={prompt}
            onChangeText={handleInput}
          />
          <TouchableOpacity onPress={handleInfo}>
            <Icon name="information-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={results}
          renderItem={({item}) => <Item drug={item} />}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{backgroundColor: '#fff'}}
        />
      </SafeAreaView>
    </View>
  );
};

export default DrugList;

const styles = StyleSheet.create({
  base: {backgroundColor: '#ff5959', flex: 1},
  panel: {
    backgroundColor: '#ff5959',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prompt: {
    borderColor: '#ef4949',
    borderWidth: 1,
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
