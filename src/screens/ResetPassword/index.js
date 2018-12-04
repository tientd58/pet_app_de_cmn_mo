import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { sendEmailReset, clearErrorCodeLogin } from '../../actions/auth';
import { email } from '../../utils/validators';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailReset: { 
                email: null,
            },
            isLoading: false,
        };
    }

    handleChangeText = (field, value) => {
        this.setState({
            emailReset: {
                [field]: value.trim() === '' ? null : value,
            }
        })
    }

    sendEmailReset = async () => {
        if (this.state.emailReset.email === null) return this.renderAlert('Nhắc nhở','Vui lòng nhập email');
        if (!email(this.state.emailReset.email)) return this.renderAlert('Nhắc nhở','Email không đúng định dạng.\nVui lòng nhập lại!');
        this.toggleLoading();
        await this.props.sendEmailReset(this.state.emailReset);
        if (this.props.Auth.errorCode === 200) {
            this.renderAlert('Thành công', 'Làm ơn kiểm tra hộp thư đến email của bạn và tiến hành lấy mã code.', () =>{
                this.props.clearErrorCodeLogin();
                this.props.navigation.push('UpdatePassword');
            });
            this.toggleLoading();
        } else {
            this.props.clearErrorCodeLogin();
            this.toggleLoading();
            this.renderAlert('Nhắc nhở','Email không đúng.\nVui lòng kiểm tra lại!');
        }
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderAlert = (title, message, onPressOK) => Alert.alert(title, message, [{text: 'OK', onPress: onPressOK}], { cancelable: true })

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        return (
            <TouchableWithoutFeedback
                style={{flex: 1}}
                onPress={Keyboard.dismiss} 
                accessible={false}
            >
                {
                    this.state.isLoading ? this.renderLoading() : (
                        <View style={{flex: 1}}>
                            <TouchableOpacity style={{marginTop: 30, marginHorizontal: 10}} onPress={() => this.props.navigation.goBack()}>
                                <FontAwesome name="angle-left" size={25} />
                            </TouchableOpacity>
                            <View style={styles.formContainer}>
                                <Text style={styles.titlePage}>
                                    {`Vui lòng nhập email tài khoản của bạn. \nỨng dụng sẽ gửi mã xác nhận reset mật khẩu qua email này.`}
                                </Text>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('email', text)}
                                        value={this.state.email}
                                        keyboardType='email-address'
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <TouchableOpacity style={styles.buttonConfirm} onPress={this.sendEmailReset}>
                                    <Text style={styles.textButtonConfirm}>Gửi email</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = ({ Auth }) => ({
    Auth,
})

const mapDispatchToProps = {
    sendEmailReset,
    clearErrorCodeLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
