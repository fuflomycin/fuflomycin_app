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
    <Container>
      <Header transparent>
        <Form style={{flex: 1}}>
          <Item>
            <Icon name="search" />
            <Input
              value={prompt}
              onChangeText={newPrompt => {
                const p = newPrompt.toLocaleUpperCase();
                setResults([...drugs.filter(i => i.index.includes(p))]);
                setPrompt(newPrompt);
              }}
              ref={searchRef}
            />
            <Badge style={{backgroundColor: 'transparent'}}>
              <Text style={{color: '#aaa'}}>{results.length}</Text>
            </Badge>
          </Item>
        </Form>
      </Header>
      <Content>
        <List>
          {results.map((drug: Drug) => (
            <ListItem noIndent key={drug.id}>
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
      </Content>
    </Container>
  );
};

export default DrugList;
