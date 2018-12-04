import React, { Component } from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { changePassword } from '../../actions/profile';
import { password } from '../../utils/validators';
import { clearErrorCode } from '../../actions/error';
import ButtonPrimary from '../../components/ButtonPrimary';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: {
                old_password: null,
                password: null,
                confirm_password: null,
            },
            isLoading: false,
            messageValidate: null,
            isValidate: false,
        };
    }

    checkFormFillOut = (pass) => Object.values(pass).find(item => item === null)

    validateForm = (pass) => {
        
        if (!password(pass.old_password) || !password(pass.password) || !password(pass.confirm_password)) {
            this.setState({messageValidate: 'Password không được chứa khoảng trắng.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
        if (pass.password !== pass.confirm_password) {
            this.setState({messageValidate: 'Xác nhận mật khẩu không khớp.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
    }
    
    SaveChangePassword = async () => {
        if (this.checkFormFillOut(this.state.password) !== undefined) return this.renderAlert('Nhắc nhở', 'Vui lòng nhập đầy đủ mật khẩu');
        await this.validateForm(this.state.password);
        if (this.state.isValidate === true) {
            return this.renderAlert('Nhắc nhở', this.state.messageValidate, () => this.setState({messageValidate: null, isValidate: false}));
        }
        this.toggleLoading();
        await this.props.changePassword(this.state.password);
        if (this.props.Profile.errorCode === 402) {
            this.renderAlert('Thất bại', 'Mật khẩu cũ không đúng.\nVui lòng thử lại.', () => {
                this.props.clearErrorCode();
            });
        } else if (this.props.Profile.errorCode === 200) {
            this.renderAlert('Thành công', 'Đổi mật khẩu thành công.', () => {
                this.props.clearErrorCode();
                this.props.navigation.goBack();
            });
        }
        this.toggleLoading();
    }

    handleChangeText = (field, value) => {
        this.setState({
            password: {
                ...this.state.password,
                [field]: value.trim() === '' ? null : value,
            }
        });
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderAlert = (title, message, onPressOK) => Alert.alert(title, message, [{text: 'OK', onPress: onPressOK}], { cancelable: true })

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ? this.renderLoading() : (
                        <View style={{flex: 1}}>
                            <View style={styles.menuProfile}>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Mật khẩu cũ</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        secureTextEntry
                                        onChangeText={text => this.handleChangeText('old_password', text)}
                                        value={this.state.password.old_password}
                                        keyboardType="default"
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Mật khẩu mới</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        secureTextEntry
                                        onChangeText={text => this.handleChangeText('password', text)}
                                        value={this.state.password.password}
                                        keyboardType="default"
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Nhập lại mật khẩu mới</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        secureTextEntry
                                        onChangeText={text => this.handleChangeText('confirm_password', text)}
                                        value={this.state.password.confirm_password}
                                        keyboardType="default"
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                            </View>
                            <ButtonPrimary text='Xác nhận' onPress={this.SaveChangePassword} />
                        </View>
                    )
                }
            </View>
        );
    }
}

const  mapStateToProps = ({ Profile }) => ({
    Profile,
});

const mapDispatchToProps = {
    changePassword,
    clearErrorCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
