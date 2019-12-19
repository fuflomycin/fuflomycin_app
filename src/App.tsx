import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DrugList from './DrugList';
import DrugItem from './DrugItem';

const AppNavigator = createStackNavigator(
  {
    DrugList: {screen: DrugList},
    DrugItem: {screen: DrugItem},
  },
  {headerMode: 'none'},
);

export default createAppContainer(AppNavigator);
