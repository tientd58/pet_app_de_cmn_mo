import React from 'react';
import { StackNavigator } from 'react-navigation';
import CoffeeScreen from '../screens/Coffee';
import CategoryFoodItem from '../screens/Coffee/CategoryItem';
import ConfirmOrder from '../screens/Coffee/ConfirmOrder';
import { colors } from '../utils/constants';
import * as NavigationOptions from './configs';

export default StackNavigator(
    {
        Coffee: {
            screen: props => <CoffeeScreen {...props} />,
            navigationOptions: NavigationOptions.CoffeeOptions,
        },
        CategoryFoodItem: {
            screen: props => <CategoryFoodItem {...props} />,
            navigationOptions: NavigationOptions.CategoryFoodItemOptions,
        },
        ConfirmOrder: {
            screen: props => <ConfirmOrder {...props} />,
            navigationOptions: NavigationOptions.ConfirmOrderOptions,
        },
    },
    {
        initialRouteName: 'Coffee',
        headerMode: 'none',
        cardStyle: {
            backgroundColor: colors.WHITE,
        },
    }
);
