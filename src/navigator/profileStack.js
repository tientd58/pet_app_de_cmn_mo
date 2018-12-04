import React from 'react';
import { StackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import ChangePassword from '../screens/Profile/ChangePassword';
import OrderHistory from '../screens/Profile/OrderHistory';
import ServicesHistory from '../screens/Profile/ServicesHistory';
import DetailOrderHistory from '../screens/Profile/DetailOrderHistory';
import DetailServiceHistory from '../screens/Profile/DetailServiceHistory';
import { colors } from '../utils/constants';
import * as NavigationOptions from './configs';

export default StackNavigator(
    {
        Profile: {
            screen: props => <ProfileScreen {...props} />,
            navigationOptions: NavigationOptions.ProfileOptions,
        },
        EditProfile: {
            screen: props => <EditProfile {...props} />,
            navigationOptions: NavigationOptions.EditProfileOptions,
        },
        ChangePassword: {
            screen: props => <ChangePassword {...props} />,
            navigationOptions: NavigationOptions.ChangePasswordOptions,
        },
        OrderHistory: {
            screen: props => <OrderHistory {...props} />,
            navigationOptions: NavigationOptions.OrderHistoryOptions,
        },
        ServicesHistory: {
            screen: props => <ServicesHistory {...props} />,
            navigationOptions: NavigationOptions.ServicesHistoryOptions,
        },
        DetailOrderHistory: {
            screen: props => <DetailOrderHistory {...props} />,
            navigationOptions: NavigationOptions.DetailOrderHistoryOptions,
        },
        DetailServiceHistory: {
            screen: props => <DetailServiceHistory {...props} />,
            navigationOptions: NavigationOptions.DetailServiceHistoryOptions,
        },
    },
    {
        initialRouteName: 'Profile',
        headerMode: 'none',
        cardStyle: {
            backgroundColor: colors.WHITE,
        },
    }
);
