import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ActionSheet from 'react-native-actionsheet';
import { ImagePicker, Permissions } from 'expo';
import styles from './styles';
import { editProfile, uploadAvatarUser } from '../../actions/profile';
import { images } from '../../utils/constants';
import { number, name, email } from '../../utils/validators';
import ButtonPrimary from '../../components/ButtonPrimary';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.user = props.navigation.getParam('user');
        this.state = {
            user: {
                name: this.user.name,
                phone: this.user.phone,
                email: this.user.email,
                birthday: moment(this.user.birthday * 1000).format('DD/MM/YYYY'),
            },
            isLoading: false,
            isDateTimePickerVisible: false,
            messageValidate: null,
            isValidate: false,
        };
    }

    validateUser = (user) => Object.values(user).find(item => item === null)

    SaveChangeProfile = async () => {
        if (this.validateUser(this.state.user) !== undefined) return this.renderAlert('Nhắc nhở','Vui lòng nhập đầy đủ thông tin')
        await this.validateEditForm(this.state.user);
        if (this.state.isValidate === true) {
            return this.renderAlert('Nhắc nhở', this.state.messageValidate, () => this.setState({messageValidate: null, isValidate: false}));
        }
        this.toggleLoading();
        await this.props.editProfile(this.state.user).then(() => {
            this.renderAlert('Thành công', 'Cập nhật thông tin người dùng thành công.', () => {
                this.props.navigation.goBack();
            });
        });
        // this.props.navigation.goBack();
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

    validateEditForm = (user) => {
        if (name(user.name)) {
            this.setState({messageValidate: 'Tên người dùng không được chứa kí tự đặc biệt.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
      
        if (!email(user.email)) {
            this.setState({messageValidate: 'Email không đúng định dạng.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
        if (!number(user.phone)) {
            this.setState({messageValidate: 'Số điện thoại chỉ chấp nhận số.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
        
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

    parseFormData = (result) => {
        const localUri = result.uri;
        const filename = localUri.split('/').pop();

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();
        formData.append('service', 'avatar');
        formData.append('user_id', this.user.id);
        formData.append('photo', { uri: localUri, name: filename, type });
        return formData;
    }

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: Platform.OS === 'ios',
          aspect: [4, 3],
        });
        if (!result.cancelled) {
            const body = this.parseFormData(result);
            await this.props.uploadAvatarUser(body);
        }
    };

    takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: Platform.OS === 'ios',
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            const body = this.parseFormData(result);
            await this.props.uploadAvatarUser(body);
        }
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    handleTakePhoto = async (index) => {
        if (index === 0) {
            await this.askPermissionsAsync();
            this.pickImage();
        }
        if (index === 1) {
            await this.askPermissionsAsync();
            this.takePhoto();
        }
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderAlert = (title, message, onPressOK) => Alert.alert(title, message, [{text: 'OK', onPress: onPressOK}], { cancelable: true })

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ? this.renderLoading() : (
                        <KeyboardAwareScrollView
                            extraScrollHeight={Platform.OS === 'ios' ? 10 : 100} enableOnAndroid
                            style={{ flex: 1 }}
                        >
                            <View  style={styles.avatarUser}>
                                <TouchableOpacity onPress={() => this.ActionSheet.show()}>
                                    {
                                        this.props.Profile.profileUser.avatar ? 
                                        <Image style={styles.imageAvatar} source={{ uri: this.props.Profile.profileUser.avatar }} />
                                        : <Image style={styles.imageAvatar} source={images.avatarDefault} />
                                    }
                                    <MaterialCommunityIcons  style={styles.iconEditImage} name='pencil-circle' size={25} color='orange' />
                                </TouchableOpacity>
                                <ActionSheet
                                    ref={o => this.ActionSheet = o} // eslint-disable-line
                                    title='Chọn nguồn của hình'
                                    options={[
                                        'Chọn từ thư viện hình',
                                        'Chụp hình',
                                        'Huỷ bỏ',
                                    ]}
                                    cancelButtonIndex={2}
                                    onPress={(index) => this.handleTakePhoto(index)}
                                />
                            </View>
                            <View style={styles.menuProfile}>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Họ tên</Text>
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
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Số điện thoại</Text>
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
                            </View>
                            <ButtonPrimary text='Xác nhận' onPress={this.SaveChangeProfile} />
                        </KeyboardAwareScrollView>
                    )
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Profile }) => ({
    Profile,
})

const mapDispatchToProps = {
    editProfile,
    uploadAvatarUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
