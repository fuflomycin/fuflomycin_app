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
} from 'native-base';
import {WebView} from 'react-native-webview';

import Drug from './Drug';

const App = () => {
  // drugs sourse
  const homeopathyUrl = `https://bndby.github.io/fuflomycin/homeopathy.json`;

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
      <Header span>
        <View>
          <Body>
            <Title>Расстрельный список препаратов</Title>
            <Subtitle>Препаратов: 7</Subtitle>
          </Body>
          <Item rounded style={{backgroundColor: '#fff', marginBottom: 15}}>
            <Icon name="search" />
            <Input value={prompt} onChangeText={setPrompt} ref={searchRef} />
          </Item>
        </View>
      </Header>
      <Content padder>
        {results.length > 1 && (
          <List>
            {results.map(drug => (
              <ListItem>
                <Text
                  onPress={() => {
                    setPrompt(drug.title);
                  }}>
                  {drug.title}
                </Text>
              </ListItem>
            ))}
          </List>
        )}
        {results.length === 1 && (
          <Card>
            <CardItem header>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {results[0].title}
              </Text>
            </CardItem>
            <CardItem>
              <Text>{results[0].section}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <WebView
                  style={{
                    flex: 1,
                    width: 300,
                    height: 100,
                    borderWidth: 1,
                    borderColor: 'red',
                  }}
                  originWhitelist={['*']}
                  textZoom={300}
                  source={{html: results[0].contents}}
                />
              </Body>
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
};

export default App;
