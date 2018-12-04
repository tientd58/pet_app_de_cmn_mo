import { TabNavigator, StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login';
import Register from '../screens/Register';
import ResetPassword from '../screens/ResetPassword';
import UpdatePassword from '../screens/UpdatePassword';
import AppMainStack from './appMainTab';
import AuthLoadingScreen from '../screens/AuthLoading';
import { colors } from '../utils/constants';

const User = StackNavigator(
    {
        LoginPage: { screen: LoginScreen },
        Register: { screen: Register },
        ResetPassword: {screen: ResetPassword },
        UpdatePassword: {screen: UpdatePassword}
    },
    {
        initialRouteName: 'LoginPage',
        headerMode: 'none',
        cardStyle: {
            backgroundColor: colors.BACKGROUND,
        },
    }
);

export default TabNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Login: User,
        Main: { screen: AppMainStack },
    },
    {
        initialRouteName: 'AuthLoading',
        navigationOptions: {
            tabBarVisible: false,
        },
        swipeEnabled: false,
    }
);