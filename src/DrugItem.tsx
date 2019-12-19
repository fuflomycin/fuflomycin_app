import React, {useState, useEffect} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
} from 'native-base';

import Drug from './Drug';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const DrugItem = () => {
  const {goBack} = useNavigation();

  const drug: Drug = useNavigationParam('drug');

  //
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              console.log('Back');
              goBack(null);
            }}>
            <Icon
              name="arrow-back"
              type="MaterialIcons"
              android="arrow-back"
              ios="ios-arrow-back"
            />
          </Button>
        </Left>
        <Body>
          <Title>{drug.title}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>{drug.title}</Text>
      </Content>
    </Container>
  );
};

export default DrugItem;
