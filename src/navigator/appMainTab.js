import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import PetStack from './petStack';
import ProfileStack from './profileStack';
import CoffeeStack from './coffeeStack';
import ServicesStack from './serviceStack';
import SettingsScreen from '../screens/Settings';
import { colors } from '../utils/constants';
import { tabBarConfigs } from './configs'

const AppMainTab = TabNavigator(
    {
        CoffeeTab: { screen: CoffeeStack },
        ServicesTab: { screen: ServicesStack },
        PetTab: { screen: PetStack },
        ProfileTab: { screen: ProfileStack },
    },
    {
        initialRouteName: 'CoffeeTab',
        ...tabBarConfigs,
    }
);

export default StackNavigator(
    {
        Pet: { screen: AppMainTab },
        Settings: { screen: SettingsScreen },
    },
    {
        cardStyle: {
            backgroundColor: colors.WHITE,
        },
        mode: 'modal',
    }
);
