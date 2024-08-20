import * as React from 'react';
import DrugList from './DrugList';
import DrugItem from './DrugItem';
import DrugInfo from './DrugInfo';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drug} from './db';

export type StackParamList = {
  DrugList: undefined;
  DrugItem: {drug: Drug};
  DrugInfo: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const headerOptions = {
  headerShown: false,
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DrugList"
          component={DrugList}
          options={headerOptions}
        />
        <Stack.Screen
          name="DrugItem"
          component={DrugItem}
          options={headerOptions}
        />
        <Stack.Screen
          name="DrugInfo"
          component={DrugInfo}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
