import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
// import * as NavigationOptions from './configs';
import { BackIcon } from '../components/icons';
import { colors } from '../utils/constants';
import SettingsScreen from '../screens/Settings';

export default StackNavigator(
    {
        Setting: {
            screen: props => <SettingsScreen {...props} />,
            // navigationOptions: NavigationOptions.HomeOptions,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Settings',
                drawerIcon: ({ tintColor }) => (
                    <Ionicons name="md-settings" size={23} color={tintColor} />
                ),
                headerStyle: {
                    backgroundColor: colors.WHITE,
                },
                headerTitle: 'Settings',
                headerTitleStyle: {
                    color: colors.WHITE,
                },
                headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
            }),
        },
    },
    {
        initialRouteName: 'Setting',
        headerMode: 'none',
        cardStyle: {
            // backgroundColor: colors.WHITE,
        },
    }
);
