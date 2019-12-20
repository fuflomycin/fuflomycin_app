import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import DrugList from './DrugList';
import DrugItem from './DrugItem';

const AppNavigator = createSwitchNavigator(
  {
    DrugList: {screen: DrugList},
    DrugItem: {screen: DrugItem},
  },
  {initialRouteName: 'DrugList'},
);

export default createAppContainer(AppNavigator);
