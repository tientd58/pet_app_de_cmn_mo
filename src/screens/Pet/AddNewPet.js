import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actionsheet';
import { ImagePicker, Permissions } from 'expo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './styles';
import { colors } from '../../utils/constants';
import { addPet, editPet, uploadImagePet, deleteImageUpload } from '../../actions/pet';
import { number } from '../../utils/validators';
import ButtonPrimary from '../../components/ButtonPrimary';

class AddNewPet extends Component {

    constructor(props) {
        super(props);
        this.pet = props.navigation.getParam('pet');
        this.isEdit = props.navigation.getParam('isEdit');
        this.state = {
            pet: !this.isEdit ? {
                name: null,
                weight: null,
                birthday: null,
                description: null,
                idUpload: '',
            } : {
                name: this.pet.name,
                weight: this.pet.weight,
                birthday: moment(this.pet.birthday * 1000).format('DD/MM/YYYY'),
                description: this.pet.description,
                idUpload: '',
            },
            isLoading: false,
            date: '',
            isDateTimePickerVisible: false,
            messageValidate: null,
            isValidate: false,
        };
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
    handleDatePicked = (date) => {
        this.setState({
            pet: {
                ...this.state.pet,
                birthday: moment(date).format('DD/MM/YYYY'),
            }
        });
        this.hideDateTimePicker();
    };

    checkFormFillOut = (pet) => Object.values(pet).find(item => item === null)

    validateEditForm = (pet) => {
        if (!number(pet.weight)) {
            this.setState({messageValidate: 'Cân nặng chỉ chấp nhận số.\nVui lòng nhập lại!', isValidate: true});
            return;
        }
    }
    
    SavePet = async () => {
        if (this.checkFormFillOut(this.state.pet) !== undefined) return this.renderAlert('Nhắc nhở','Vui lòng nhập đầy đủ thông tin')
        await this.validateEditForm(this.state.pet);
        if (this.state.isValidate === true) {
            return this.renderAlert('Nhắc nhở', this.state.messageValidate, () => this.setState({messageValidate: null, isValidate: false}));
        }
        if (this.isEdit) {
            this.toggleLoading();
            await this.props.editPet(this.state.pet, this.pet.id).then(() => {
                this.renderAlert('Thành công', 'Cập nhật thông tin thú cưng thành công.', () => {
                    this.props.navigation.goBack();
                });
            });
            this.toggleLoading();
        } else {
            if (this.state.pet.idUpload === '') return Alert.alert('Nhắc nhở','Vui lòng chọn hình của thú cưng');
            this.toggleLoading();
            await this.props.addPet(this.state.pet).then(() => {
                this.renderAlert('Thành công', 'Tạo thú cưng thành công.', () => {
                    this.props.navigation.goBack();
                });
            });
            this.toggleLoading();
        }
    }

    handleChangeText = (field, value) => {
        this.setState({
            pet: {
                ...this.state.pet,
                [field]: value.trim() === '' ? null : value,
            }
        });
    }

    parseFormData = (result) => {
        const localUri = result.uri;
        const filename = localUri.split('/').pop();

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type });
        formData.append('service', 'pet');
        return formData;
    }

    pickImage = async (field = 'idUpload') => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: Platform.OS === 'ios',
          aspect: [4, 3],
        });
        if (!result.cancelled) {
            const body = this.parseFormData(result);
            await this.props.uploadImagePet(body);
            const idUpload = this.props.Pet.imagesId;
            this.setState({
                pet: {
                    ...this.state.pet,
                    [field]: idUpload,
                }
            });
        }
    };

    takePhoto = async (field = 'idUpload') => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: Platform.OS === 'ios',
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            const body = this.parseFormData(result);
            await this.props.uploadImagePet(body);
            const idUpload = this.props.Pet.imagesId;
            this.setState({
                pet: {
                    ...this.state.pet,
                    [field]: idUpload,
                }
            });
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

    handleDeleteImage = async (item) => {
        const imagesId = item.split('/').pop();
        await this.props.deleteImageUpload(imagesId, item);
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderAlert = (title, message, onPressOK) => Alert.alert(title, message, [{text: 'OK', onPress: onPressOK}], { cancelable: true })

    renderImage = (imagesList) => {
        if (imagesList.length !== 0) {
            return imagesList.map(item => (
                <View style={styles.imagePetContainer} key={item}>
                    <Image key={item} style={styles.selectImageItem} source={{ uri: item }} />
                    <TouchableOpacity style={styles.deleteImage} onPress={() => this.handleDeleteImage(item)}>
                        <MaterialCommunityIcons name='close-circle' size={15} color={colors.GRAY_3} />
                    </TouchableOpacity>
                </View>
            ))
        }
        return null;
    }

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        return (
            <View style={{flex: 1, marginHorizontal: 10}} >
                {
                    this.state.isLoading ? this.renderLoading() : (
                        <KeyboardAwareScrollView
                            extraScrollHeight={Platform.OS === 'ios' ? 10 : 100} enableOnAndroid
                            style={{ flex: 1 }}
                        >
                            <View style={styles.imageContainer}>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5}}>
                                    <TouchableOpacity style={[styles.selectImageItem, {backgroundColor: colors.GRAY_DEFAULT}]} onPress={() => this.ActionSheet.show()}>
                                        <MaterialIcons name='add-a-photo' size={35} color={colors.GRAY_3} />
                                    </TouchableOpacity>
                                    { this.renderImage(this.props.Pet.imagesPet) }
                                </View>
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
                            <View style={styles.formContainer}>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Tên thú cưng</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('name', text)}
                                        value={this.state.pet.name}
                                        keyboardType="default"
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Cân nặng (kg)</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('weight', text)}
                                        value={this.state.pet.weight}
                                        keyboardType='numeric'
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                                <TouchableOpacity style={styles.itemInput} onPress={this.showDateTimePicker}>
                                    <Text style={styles.labelInput}>Ngày sinh</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        value={this.state.pet.birthday}
                                        underlineColorAndroid='transparent'
                                        editable={false}
                                        
                                    />
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                        maximumDate={new Date()}
                                    />
                                </TouchableOpacity>
                                <View style={styles.itemInput}>
                                    <Text style={styles.labelInput}>Ghi chú</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor='#FFFFFF'
                                        autoCapitalize="none"
                                        onChangeText={text => this.handleChangeText('description', text)}
                                        value={this.state.pet.description}
                                        keyboardType='default'
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                            </View>
                            <ButtonPrimary text='Xác nhận' onPress={this.SavePet} />
                        </KeyboardAwareScrollView>
                    )
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Pet }) => ({
    Pet,
})

const mapDispatchToProps = {
    addPet,
    editPet,
    uploadImagePet,
    deleteImageUpload,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPet);
