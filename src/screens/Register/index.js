import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './styles';
import { register } from '../../actions/auth';
import { colors } from '../../utils/constants';
import { number, password, name, email } from '../../utils/validators';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: null,
                email: null,
                birthday: null,
                phone: null,
                password: null,
                confirm_password: null,
                gender: 1,
                type: 3,
            },
            isLoading: false,
            isDateTimePickerVisible: false,
            messageValidate: null,
            isValidate: false,
        };
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
    handleDatePicked = (date) => {
        this.setState({
            user: {
                ...this.state.user,
                birthday: moment(date).format('DD/MM/YYYY'),
            }
        });
        this.hideDateTimePicker();
    };

    checkFormFillOut = (user) => Object.values(user).find(item => item === null)

    validateRegisterForm = (user) => {
        if (name(user.name)) {
            this.setState({messageValidate: 'Tên người dùng không được chứa kí tự đặc biệt.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
      
        if (!email(user.email)) {
            this.setState({messageValidate: 'Email không đúng định dạng.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
        if (!password(user.password)) {
            this.setState({messageValidate: 'Password không được chứa khoảng trắng.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
        if (!number(user.phone)) {
            this.setState({messageValidate: 'Số điện thoại chỉ chấp nhận số.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
        if (user.password !== user.confirm_password) {
            this.setState({messageValidate: 'Xác nhận mật khẩu không khớp.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
    }
    
    SaveUser = async () => {
        if (this.checkFormFillOut(this.state.user) !== undefined) return this.renderAlert('Nhắc nhở', 'Vui lòng nhập đầy đủ thông tin');
        await this.validateRegisterForm(this.state.user);
        if (this.state.isValidate === true) {
            return this.renderAlert('Nhắc nhở', this.state.messageValidate, () => this.setState({messageValidate: null, isValidate: false}));
        }
        this.toggleLoading();
        const key = 'confirm_password';
        const user = this.state.user;
        delete user[key];
        await this.props.register(user).then(() => {
            this.renderAlert('Thành công', 'Tạo người dùng thành công.', () => {
                this.props.navigation.goBack();
            });
        });
        this.toggleLoading();
    }

    handleChangeText = (field, value) => {
        this.setState({
            user: {
                ...this.state.user,
                [field]: value.trim() === '' ? null : value,
            }
        });
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderAlert = (title, message, onPressOK) => Alert.alert(title, message, [{text: 'OK', onPress: onPressOK}], { cancelable: true })

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        return (
            <View style={{flex: 1}}>
                {
                    this.state.isLoading ? this.renderLoading() : (
                        <KeyboardAwareScrollView
                            extraScrollHeight={Platform.OS === 'ios' ? 10 : 100} enableOnAndroid
                            style={{ flex: 1 }}
                        >
                            <TouchableOpacity style={{marginTop: 30, marginHorizontal: 10}} onPress={() => this.props.navigation.goBack()}>
                                <MaterialCommunityIcons name="window-close" size={25} />
                            </TouchableOpacity>
                            <View style={styles.formContainer}>
                                <View style={{marginBottom: 30}}>
                                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colors.WHITE}}>Đăng ký tài khoản</Text>
                                </View>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Tên người dùng</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('name', text)}
                                        value={this.state.user.name}
                                        keyboardType="default"
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <TouchableOpacity style={styles.itemInput} onPress={this.showDateTimePicker}>
                                    <Text style={styles.labelInput}>Ngày sinh</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        value={this.state.user.birthday}
                                        underlineColorAndroid='transparent'
                                        editable={false}
                                        
                                    />
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                    />
                                </TouchableOpacity>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('email', text)}
                                        value={this.state.user.email}
                                        keyboardType='email-address'
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Số điên thoại</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('phone', text)}
                                        value={this.state.user.phone}
                                        keyboardType='numeric'
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Mật khẩu</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        secureTextEntry
                                        onChangeText={text => this.handleChangeText('password', text)}
                                        value={this.state.user.password}
                                        keyboardType="default"
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Nhập lại mật khẩu</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        secureTextEntry
                                        onChangeText={text => this.handleChangeText('confirm_password', text)}
                                        value={this.state.user.confirm_password}
                                        keyboardType="default"
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <TouchableOpacity style={styles.buttonConfirm} onPress={() => this.SaveUser()}>
                                    <Text style={styles.textButtonConfirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView> )
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Auth }) => ({
    Auth,
})

const mapDispatchToProps = {
    register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
