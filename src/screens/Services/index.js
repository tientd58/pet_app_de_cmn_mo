import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import { getListCategories } from '../../actions/service';
import { images } from '../../utils/constants';

class ServicesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    async componentDidMount() {
        this.toggleLoading();
        await this.props.getListCategories();
        this.toggleLoading();
    }

    handleGetServiceByCategory = (item) => {
        this.props.navigation.navigate('ServiceByCategory', {
            header: item.name,
            categoryId: item.id,
        })
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderImage = (listCategory) => listCategory.map(item => (
        <TouchableOpacity key={item.id} style={styles.imageContent} onPress={() => this.handleGetServiceByCategory(item)}>
            <Image style={styles.imageItem} source={{ uri: images.defaultImagePet }} />
            <Text style={styles.nameCategory}>{item.name}</Text>
        </TouchableOpacity>
        ))

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        const { Service } = this.props;
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ? this.renderLoading() :
                    <ScrollView style={styles.imageContainer}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            { this.renderImage(Service.listCategory) }
                        </View>
                    </ScrollView>
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Service }) => ({
    Service,
});

const mapDispatchToProps = {
    getListCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);
