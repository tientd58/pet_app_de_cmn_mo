import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Platform, Keyboard, View, ActivityIndicator, TextInput, TouchableOpacity, Image } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast'
import { login, clearErrorCode, clearErrorCodeLogin } from '../../actions/auth';
import * as validators from '../../utils/validators';
import { colors, images } from '../../utils/constants';
import styles from './styles';
import { bootstrapAuthorize } from '../../utils/authorization';

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            isLoading: false,
        };
    }

    handleClearErrorCode = () => {
        this.props.clearErrorCode();
        this.props.clearErrorCodeLogin();
    }

    handleLogin = async () => {
        Keyboard.dismiss();
        const validUsername = validators.notEmpty(this.state.username);
        const validPassword = validators.notEmpty(this.state.password);

        if (validPassword && validUsername) {
            const userInfo = {
                email: this.state.username,
                password: this.state.password,
            }
            this.toggleLoading();
            await this.props.login(userInfo);
            if (this.props.Auth.errorCode === 200) {
                await bootstrapAuthorize(this.props.navigation);
                this.handleClearErrorCode();
                this.toggleLoading();
            } else {
                this.toggleLoading();
                this.toast.show(
                    <View>
                        <Text style={{textAlign: 'center', color: colors.WHITE}}>
                            {`Email hoặc mật khẩu chưa đúng.\nVui lòng thử lại.`}
                        </Text>
                    </View>,
                    2000,
                    this.handleClearErrorCode()
                );
            }
        } else {
            this.toast.show(
                <View>
                    <Text style={{textAlign: 'center', color: colors.WHITE}}>
                        {`Email hoặc mật khẩu không được bỏ trống.\nVui lòng thử lại.`}
                    </Text>
                </View>,
                2000,
            );
        }
        
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

	render() {
        return (
            <View style={styles.formContainer}>
            { this.state.isLoading ? this.renderLoading() :
                <KeyboardAwareScrollView
                    extraScrollHeight={Platform.OS === 'ios' ? 10 : 100} enableOnAndroid
                    style={{flex: 1}}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logoContent}  source={images.logo} />
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            {/* <FontAwesome name='user' size={23} style={styles.iconInput} /> */}
                            <TextInput
                                style={styles.formItem}
                                autoCapitalize="none"
                                placeholder='Email'
                                onChangeText={text => this.setState({username: text})}
                                value={this.state.username}
                                keyboardType='email-address'
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={{marginBottom: 10}} />
                        <View style={styles.inputContainer}>
                            {/* <FontAwesome name='lock' size={23} style={styles.iconInput} /> */}
                            <TextInput
                                style={styles.formItem}
                                autoCapitalize="none"
                                placeholder='Mật khẩu'
                                onChangeText={text => this.setState({password: text})}
                                value={this.state.password}
                                secureTextEntry
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.forgetPassword}
                            onPress={() => this.props.navigation.navigate('ResetPassword')}>
                            <Text style={{textAlign: 'center', color: colors.RED, fontWeight: '600'}}>Quên mật khẩu? </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.handleLogin}>
                            <Text style={styles.textButton}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexDirection: 'row', justifyContent: 'center'}}
                            onPress={() => this.props.navigation.navigate('Register')}>
                            <Text>Bạn chưa có tài khoản? </Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.WHITE}}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    <Toast ref={(ref) => {this.toast = ref}}/>
                </KeyboardAwareScrollView>}
            </View>
        );
    }
}

const mapStateToProps = ({ Auth, MyError }) => ({
    Auth,
    MyError,
});

const mapDispatchToProps = {
    login,
    clearErrorCode,
    clearErrorCodeLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
