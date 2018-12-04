import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { STORAGE_KEY } from './constants';

const _tabPriority = () => ({
    routeName: 'Main',
    action: NavigationActions.navigate({
        routeName: 'CoffeeTab',
    }),
});

export const bootstrapAuthorize = async (navigation) => {
    const userToken = await AsyncStorage.getItem(STORAGE_KEY.AUTH_TOKEN);
    navigation.navigate(userToken ? _tabPriority() : 'Login');
};
