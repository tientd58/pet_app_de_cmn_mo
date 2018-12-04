import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import { getListFood } from '../../actions/coffee';

class CoffeeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    async componentDidMount() {
        this.toggleLoading();
        await this.props.getListFood();
        this.toggleLoading();
    }

    handleGetCategoryItem = (item) => {
        this.props.navigation.push('CategoryFoodItem', {
            listItems: item,
            header: item.name
        })
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderImage = (listFood) => listFood.map(item => (
        <TouchableOpacity key={item.id} style={styles.imageContent} onPress={() => this.handleGetCategoryItem(item)}>
            <Image style={styles.imageItem} source={{ uri: item.images[0] }} />
            <Text style={styles.nameCategory}>{item.name}</Text>
        </TouchableOpacity>
        ))

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        const { Coffee } = this.props;
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ? this.renderLoading() :
                    <View style={styles.container}>
                        <ScrollView style={styles.imageContainer}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                { this.renderImage(Coffee.listFood) }
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Coffee }) => ({
    Coffee,
});

const mapDispatchToProps = {
    getListFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoffeeScreen);
