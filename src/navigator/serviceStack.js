import React from 'react';
import { StackNavigator } from 'react-navigation';
import ServicesScreen from '../screens/Services';
import ServiceByCategory from '../screens/Services/Services';
import ConfirmServices from '../screens/Services/ConfirmServices';
import { colors } from '../utils/constants';
import * as NavigationOptions from './configs';

export default StackNavigator(
    {
        Services: {
            screen: props => <ServicesScreen {...props} />,
            navigationOptions: NavigationOptions.ServicesOptions,
        },
        ServiceByCategory: {
            screen: props => <ServiceByCategory {...props} />,
            navigationOptions: NavigationOptions.ServiceByCategoryOptions,
        },
        ConfirmServices: {
            screen: props => <ConfirmServices {...props} />,
            navigationOptions: NavigationOptions.ConfirmServicesOptions,
        },
    },
    {
        initialRouteName: 'Services',
        headerMode: 'none',
        cardStyle: {
            backgroundColor: colors.WHITE,
        },
    }
);
