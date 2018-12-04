import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../utils/constants';
import { BackIcon, AddIcon, CloseIcon } from '../components/icons';

export const tabBarConfigs = {
    tabBarOptions: {
        activeTintColor: colors.ORANGE_DEFAULT,
        inactiveTintColor: colors.GRAY_DEFAULT,
        inactiveBackgroundColor: colors.WHITE,
        activeBackgroundColor: colors.WHITE,
        showIcon: true,
        showLabel: Platform.OS === 'ios',
        indicatorStyle: {
            backgroundColor: colors.WHITE,
        },
        style: {
            backgroundColor: colors.WHITE,
            borderTopWidth: 1,
            borderTopColor: colors.BUTTON_DEFAULT
        },
        upperCaseLabel: false,
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
};

const configOptions = (navigation, tabLabel, title, tabBarIcon, headerRight = null, headerLeft = false) => ({
    drawerLabel: tabLabel,
    drawerIcon: ({ tintColor }) => (
        <FontAwesome name={tabBarIcon} size={23} color={tintColor} />
    ),
    tabBarLabel: tabLabel,
    tabBarIcon: ({ tintColor }) => (
        <FontAwesome name={tabBarIcon} size={23} color={tintColor} />
    ),
    headerStyle: {
        backgroundColor: colors.BACKGROUND,
        borderBottomWidth: 1,
        borderBottomColor: colors.GRAY_1
    },
    headerTitle: title,
    headerTitleStyle: {
        color: colors.WHITE,
    },
    headerLeft,
    headerRight,
    // statusBarStyle: colors.black,
    // statusBarVisible: true,
});

const configOptionsNotTabBar = (title, headerRight = null, headerLeft = false) => ({ // eslint-disable-line
    headerStyle: {
        backgroundColor: colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: colors.GRAY_1
    },
    headerTitle: title,
    headerTitleStyle: {
        color: colors.BLACK,
    },
    headerLeft,
    headerRight,
});

export const PetOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerRight = <AddIcon onPress={params.handleAddNewPet} />;
    return configOptions(navigation, 'Thú cưng', `Danh sách thú cưng`, 'paw', headerRight, false);
};

export const PetDetailOptions = ({ navigation }) => {
    const headerLeft = <BackIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Thú cưng', `Thông tin thú cưng`, 'paw', null, headerLeft);
};

export const AddNewPetOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerLeft = <CloseIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Thú cưng', params.header, 'paw', null, headerLeft);
};

export const CoffeeOptions = ({ navigation }) => configOptions(navigation, 'Đồ uống', `Danh sách đồ uống`, 'coffee', null, false);

export const CategoryFoodItemOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerLeft = <BackIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Đồ uống', params.header, 'coffee', null, headerLeft);
};

export const ConfirmOrderOptions = ({ navigation }) => {
    const headerLeft = <CloseIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Đồ uống', 'Xác nhận đặt món', 'coffee', null, headerLeft);
};

// services options config
export const ServicesOptions = ({ navigation }) => configOptions(navigation, 'Dịch vụ', `Danh sách dịch vụ`, 'medkit', null, false);

export const ServiceByCategoryOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerLeft = <BackIcon onPress={params.handleBack} />;
    return configOptions(navigation, 'Dịch vụ', params.header, 'medkit', null, headerLeft);
};

export const ConfirmServicesOptions = ({ navigation }) => {
    const headerLeft = <CloseIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Dịch vụ', 'Xác nhận dịch vụ', 'medkit', null, headerLeft);
};

// profile option config
export const ProfileOptions = ({ navigation }) => {
    const { params = {} } = navigation.state; // eslint-disable-line
    return configOptions(navigation, 'Tài khoản', `Thông tin tài khoản`, 'user-circle');
};

export const EditProfileOptions = ({ navigation }) => {
    const headerLeft = <CloseIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Profile', `Cập nhật thông tin`, 'user-circle', null, headerLeft);
};

export const ChangePasswordOptions = ({ navigation }) => {
    const headerLeft = <CloseIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Profile', `Đổi mật khẩu`, 'user-circle', null, headerLeft);
};

export const OrderHistoryOptions = ({ navigation }) => {
    const headerLeft = <BackIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Profile', `Lịch sử đồ uống`, 'user-circle', null, headerLeft);
};

export const ServicesHistoryOptions = ({ navigation }) => {
    const headerLeft = <BackIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Profile', `Lịch sử dịch vụ`, 'user-circle', null, headerLeft);
};

export const DetailOrderHistoryOptions = ({ navigation }) => {
    const headerLeft = <CloseIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Profile', `Chi tiết đặt món`, 'user-circle', null, headerLeft);
};

export const DetailServiceHistoryOptions = ({ navigation }) => {
    const headerLeft = <CloseIcon onPress={() => navigation.goBack()} />;
    return configOptions(navigation, 'Profile', `Chi tiết dịch vụ`, 'user-circle', null, headerLeft);
};
