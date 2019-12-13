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

const App = () => {
  // drugs sourse
  const homeopathyUrl = `https://fuflomycin.github.io/fuflomycin/homeopathy.json`;
  const assetsUrl = 'https://fuflomycin.github.io/fuflomycin/homeopathy/';

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
    fetch(homeopathyUrl)
      .then(response => response.json())
      .then(data => {
        let result = [];
        for (let i in data) result.push({i, ...data[i]});
        setDrugs(result);
        setResults(result);
        setPrompt('');
      });
  }, []);

  /**
   * filter results when changed prompt
   */
  useEffect(() => {
    setResults(
      drugs.filter(i => i.title.toLowerCase().includes(prompt.toLowerCase())),
    );
  }, [prompt]);

  return (
    <Container>
      <Header transparent>
        <Form style={{flex: 1}}>
          <Item>
            <Icon name="search" />

            <Input value={prompt} onChangeText={setPrompt} ref={searchRef} />
            <Badge style={{backgroundColor: 'transparent'}}>
              <Text style={{color: '#aaa'}}>{drugs.length}</Text>
            </Badge>
          </Item>
        </Form>
      </Header>
      <Content padder>
        <List>
          {results.map((drug: Drug) => (
            <ListItem key={drug.id}>
              <Body>
                <Text>{drug.title}</Text>
                <Text note>{drug.section}</Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default App;
