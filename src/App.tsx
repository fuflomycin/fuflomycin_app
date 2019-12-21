import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import DrugList from './DrugList';
import DrugItem from './DrugItem';
import DrugInfo from './DrugInfo';

const AppNavigator = createSwitchNavigator(
  {
    DrugList: {screen: DrugList},
    DrugItem: {screen: DrugItem},
    DrugInfo: {screen: DrugInfo},
  },
  {initialRouteName: 'DrugList'},
);

export default createAppContainer(AppNavigator);
