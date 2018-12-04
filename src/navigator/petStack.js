import React from 'react';
import { StackNavigator } from 'react-navigation';
import PetScreen from '../screens/Pet';
import PetDetailScreen from '../screens/Pet/PetDetail';
import AddNewPet from '../screens/Pet/AddNewPet';
import * as NavigationOptions from './configs';
import { colors } from '../utils/constants';

export default StackNavigator(
    {
        Pet: {
            screen: props => <PetScreen {...props} />,
            navigationOptions: NavigationOptions.PetOptions,
        },
        PetDetail: {
            screen: props => <PetDetailScreen {...props} />,
            navigationOptions: NavigationOptions.PetDetailOptions,
        },
        AddNewPet: {
            screen: props => <AddNewPet {...props} />,
            navigationOptions: NavigationOptions.AddNewPetOptions,
        },
    },
    {
        initialRouteName: 'Pet',
        headerMode: 'none',
        cardStyle: {
            backgroundColor: colors.WHITE,
        },
    }
);
