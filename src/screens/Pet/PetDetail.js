import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { TouchableOpacity, Text, View, ActivityIndicator, Image, Alert } from 'react-native';
import { deletePet, getPetDetail, deleteImagePet } from '../../actions/pet';
import styles from './styles';
import { images } from '../../utils/constants';
import { calculateAgePet } from '../../utils/common';
import ImageFullScreen from '../../components/ImageFullScreen';

class PetDetail extends Component {

    constructor(props) {
        super(props);
        this.pet = props.navigation.getParam('pet');
        this.state = {
            isLoading: false,
            petDetail: this.pet,
            modalVisible:  false,
            uri: null
        }
    }

    async componentDidMount() {
        this.toggleLoading();
        await this.props.getPetDetail(this.pet.id);
        this.toggleLoading();
    }

    handleDeletePet = () => {
        Alert.alert(
            'Xác nhận!',
            'Bạn có chắc chắn xoá thú cưng',
            [
                {text: 'Huỷ bỏ', onPress: () => {}},
                {text: 'Đồng ý', onPress: () => {
                    this.toggleLoading();
                    this.props.deletePet(this.pet.id).then(() => {
                        this.renderAlert('Thành công', 'Xoá thú cưng thành công.', () => {
                            this.props.navigation.goBack();
                        });
                    });
                    this.toggleLoading();
                }}
            ],
            { cancelable: false }
        );
    }

    handleDeleteImagePet = async (image) => {
        this.setState({ modalVisible: false, uri: null })
        const imagesId = image.split('/').pop();
        await this.props.deleteImagePet(imagesId, image);
    }

    goEditPetInfo = () => this.props.navigation.push('AddNewPet', { pet: this.props.Pet.petDetail, isEdit: true, header: `Cập nhật thông tin thú cưng` })

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderAlert = (title, message, onPressOK) => Alert.alert(title, message, [{text: 'OK', onPress: onPressOK}], { cancelable: true })

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    renderImage = (imagesList) => imagesList.map(item => (
        <TouchableOpacity key={item} onPress={() => this.setState({ modalVisible: true, uri: item })}>
            <Image style={styles.imageItem} source={{ uri: item }} />
        </TouchableOpacity>
    ))

    render() {
        const { Pet } = this.props;
        if (Pet.petDetail.images !== undefined) {
            return (
                <View style={styles.container}>
                    {
                        this.state.isLoading ? this.renderLoading() :
                        <View>
                            <View style={styles.petProfile}>
                                <Image style={styles.avatar} source={{ uri: Pet.petDetail.images.length !== 0 ? Pet.petDetail.images[0] : images.defaultImagePet }} />
                                <View style={styles.inforContent}>
                                    <Text style={styles.textName}>{Pet.petDetail.name}</Text>
                                    <Text style={styles.textPetInfo}>Cân nặng: {Pet.petDetail.weight} kg</Text>
                                    <Text style={styles.textPetInfo}>
                                        Tuổi: {calculateAgePet(moment(Pet.petDetail.birthday * 1000).format('MM/DD/YYYY').toString())} ({moment(Pet.petDetail.birthday * 1000).format('DD/MM/YYYY')})
                                    </Text>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.buttonEdit} onPress={this.goEditPetInfo}>
                                            <Text style={styles.textEditBotton}>Chỉnh sửa</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonDelete} onPress={this.handleDeletePet}>
                                            <Text style={styles.textEditBotton}>Xoá</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={styles.textDescription}>Mô tả</Text>
                                <Text style={styles.textPetInfo}>{Pet.petDetail.description}</Text>
                            </View>
                            <View style={styles.imageContainer}>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    { this.renderImage(Pet.petDetail.images) }
                                </View>
                            </View>
                            <ImageFullScreen
                                modalVisible={this.state.modalVisible}
                                onClose={() =>  this.setState({ modalVisible: false, uri: null })}
                                onDeleteImage={this.handleDeleteImagePet}
                                uri={this.state.uri}
                            />
                        </View>
                    }
                </View>
            );
        }
        return null;
    }
}

const mapStateToProps = ({ Pet }) => ({
    Pet,
});

const mapDispatchToProps = {
    deletePet,
    getPetDetail,
    deleteImagePet,
};

export default connect(mapStateToProps, mapDispatchToProps)(PetDetail);
