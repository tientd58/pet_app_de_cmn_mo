import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { getProfileUser, getServiceHistory, getOrderHistory } from '../../actions/profile';
import { logout } from '../../actions/auth';
import { images, colors } from '../../utils/constants';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    async componentDidMount() {
        this.toggleLoading();
        await this.props.getProfileUser();
        await this.props.getServiceHistory();
        await this.props.getOrderHistory();
        this.toggleLoading();
    }

    handleGoEditProfile = () => {
        this.props.navigation.push('EditProfile', {
            user: this.props.Profile.profileUser
        });
    }

    handleLogout = () => {
        Alert.alert(
            'Xác nhận!',
            'Bạn có chắc chắn muốn thoát ứng dụng?',
            [
                {text: 'Huỷ bỏ', onPress: () => {}},
                {text: 'Đồng ý', onPress: () => {
                    this.toggleLoading();
                    this.props.logout();
                    this.props.navigation.navigate('Login');
                    this.toggleLoading();
                }}
            ]
        );
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        const { Profile } = this.props;
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ? this.renderLoading() :
                    <View>
                        <View style={styles.userInfo}>
                            {
                                Profile.profileUser.avatar ? <Image style={styles.avatar} source={{ uri: Profile.profileUser.avatar }} />
                                : <Image style={styles.avatar} source={images.avatarDefault} />
                            }
                            <View style={styles.inforContent}>
                                <Text style={styles.textName}>{Profile.profileUser.name}</Text>
                                <Text style={styles.text}>{Profile.profileUser.phone}</Text>
                                <Text style={styles.text}>{moment(Profile.profileUser.birthday * 1000).format('DD/MM/YYYY')}</Text>
                                <Text style={styles.text}>{Profile.profileUser.email}</Text>
                                <TouchableOpacity style={styles.buttonEdit} onPress={() => this.handleGoEditProfile()}>
                                    <Text style={styles.textEditBotton}>Chỉnh sửa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.ServicesInfo}>
                            <View style={styles.itemOutOfServices}>
                                <Text>Dịch vụ (lần)</Text>
                                <Text style={styles.outOfNumber}>{Profile.listServiceHistory.length}</Text>
                            </View>
                            <View style={styles.itemOutOfCoffee}>
                                <Text>Đồ uống (lần)</Text>
                                <Text style={styles.outOfNumber}>{Profile.listOrderHistory.length}</Text>
                            </View>
                        </View>
                        <View style={styles.menuProfile}>
                            <TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.push('ChangePassword')} >
                                <FontAwesome name='file-text-o' size={25} color={colors.ORANGE_DEFAULT} />
                                <Text style={styles.titleItem}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.push('ServicesHistory')} >
                                <FontAwesome name='stethoscope' size={25} color={colors.ORANGE_DEFAULT} />
                                <Text style={styles.titleItem}>Lịch sử dịch vụ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.push('OrderHistory')} >
                                <MaterialCommunityIcons name='coffee-outline' size={25} color={colors.ORANGE_DEFAULT} />
                                <Text style={styles.titleItem}>Lịch sử món ăn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemContainer} onPress={() => this.handleLogout()} >
                                <MaterialCommunityIcons name='logout' size={25} color={colors.ORANGE_DEFAULT} />
                                <Text style={styles.titleItem}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Profile }) => ({
    Profile,
});

const mapDispatchToProps = {
    getProfileUser,
    logout,
    getServiceHistory,
    getOrderHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
