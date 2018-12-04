import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { TouchableOpacity, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { getListPet } from '../../actions/pet';
import styles from './styles';
import { images } from '../../utils/constants'
import { calculateAgePet } from '../../utils/common';

class PetScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    async componentDidMount() {
        this.props.navigation.setParams({ handleAddNewPet: () => this.props.navigation.push('AddNewPet', { header: `Thêm mới thú cưng`})})
        this.toggleLoading();
        await this.props.getListPet();
        this.toggleLoading();
    }

    handleGoPetDetail = (pet) => {
        this.props.navigation.navigate('PetDetail', { pet });
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderPetItem = (pet) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => this.handleGoPetDetail(pet)}>
            <View style={styles.itemContent}>
                <Image style={styles.image} size={80} source={{ uri: pet.images.length !== 0 ? pet.images[0] : images.defaultImagePet }} />
                <View style={styles.petInfo}>
                    <Text style={styles.textPetinfo}>{pet.name}</Text>
                    <Text style={styles.textPetinfo}>{calculateAgePet(moment(pet.birthday * 1000).format('MM/DD/YYYY').toString())} tuổi</Text>
                    <Text style={styles.textPetinfo}>Nặng {pet.weight} kg</Text>
                </View>
            </View>
            <Text  style={styles.textDateUpdate}>Cập nhật {moment(pet.updated_at * 1000).format('hh:mm DD/MM/YYYY').toString()}</Text>
        </TouchableOpacity>
    )

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        return (
            <View style={styles.container} >
                {
                    this.state.isLoading ? this.renderLoading() :
                        <FlatList
                            data={this.props.Pet.listPet}
                            extraData={this.state}
                            renderItem={({ item }) => this.renderPetItem(item)}
                            keyExtractor={(item, index) => `${item.id}${index}`}
                        />
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Pet }) => ({
    Pet,
});

const mapDispatchToProps = {
    getListPet,
};

export default connect(mapStateToProps, mapDispatchToProps)(PetScreen);
