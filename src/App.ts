import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DrugList from './DrugList';
import DrugItem from './DrugItem';
import DrugInfo from './DrugInfo';

const AppNavigator = createStackNavigator(
  {
    DrugList: {screen: DrugList},
    DrugItem: {screen: DrugItem},
    DrugInfo: {screen: DrugInfo},
  },
  {headerMode: 'none'},
);

export default createAppContainer(AppNavigator);
