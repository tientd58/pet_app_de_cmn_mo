import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { clearErrorCodeLogin, updatePassword } from '../../actions/auth';
import { password, email } from '../../utils/validators';

class UpdatePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword: {
                email: null,
                code: null,
                password: null,
                confirm_password: null,
            },
            isLoading: false,
            messageValidate: null,
            isValidate: false,
        };
    }

    checkFormFillOut = (newPassword) => Object.values(newPassword).find(item => item === null)

    validateUpdatePasswordForm = (newPassword) => {
        if (!email(newPassword.email)) {
            this.setState({messageValidate: 'Email không đúng định dạng.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
        if (newPassword.email !== this.props.Auth.emailReset) {
            this.setState({messageValidate: 'Email không đúng.\nVui lòng kiểm tra lại!', isValidate: true});
            return;
        }
        
        if (parseInt(newPassword.code, 10) !== this.props.Auth.code) {
            this.setState({messageValidate: 'Mã code xác nhận không đúng.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
        if (!password(newPassword.password)) {
            this.setState({messageValidate: 'Password không được chứa khoảng trắng.\nVui lòng nhập lại!', isValidate: true});
            return;
        }

        if (newPassword.password !== newPassword.confirm_password) {
            this.setState({messageValidate: 'Xác nhận mật khẩu không khớp.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
    }
    
    handleUpdatePassword = async () => {
        if (this.checkFormFillOut(this.state.newPassword) !== undefined) return this.renderAlert('Nhắc nhở', 'Vui lòng nhập đầy đủ thông tin');
        await this.validateUpdatePasswordForm(this.state.newPassword);
        if (this.state.isValidate === true) {
            return this.renderAlert('Nhắc nhở', this.state.messageValidate, () => this.setState({messageValidate: null, isValidate: false}));
        }
        this.toggleLoading();
        await this.props.updatePassword(this.state.newPassword);
        if (this.props.Auth.errorCode === 200) {
            this.renderAlert('Thành công', 'Lấy lại mật khẩu thành công.', () => {
                this.props.clearErrorCodeLogin();
                this.props.navigation.popToTop();
            });
            this.toggleLoading();
        } else {
            this.props.clearErrorCodeLogin();
            this.toggleLoading();
            this.renderAlert('Nhắc nhở','Email không đúng.\nVui lòng kiểm tra lại!');
        }
    }

    handleChangeText = (field, value) => {
        this.setState({
            newPassword: {
                ...this.state.newPassword,
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
                                <MaterialCommunityIcons name="window-close" size={21} />
                            </TouchableOpacity>
                            <View style={styles.formContainer}>
                                    <Text style={styles.titlePage}>
                                        {`Vui lòng nhập email tài khoản của bạn và mã code xác nhận trong email chúng tôi vừa gửi.\nSau đó thực hiện nhập mật khẩu mới.`}
                                    </Text>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('email', text)}
                                        value={this.state.newPassword.email}
                                        keyboardType='email-address'
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Mã code</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('code', text)}
                                        value={this.state.newPassword.phone}
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
                                        value={this.state.newPassword.password}
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
                                        value={this.state.newPassword.confirm_password}
                                        keyboardType="default"
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <TouchableOpacity style={styles.buttonConfirm} onPress={this.handleUpdatePassword}>
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
    updatePassword,
    clearErrorCodeLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
