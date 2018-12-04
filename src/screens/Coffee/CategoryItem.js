import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, View, FlatList, Image, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { formatMoney } from '../../utils/common';
import { images, colors } from '../../utils/constants';
import ModalOrder from '../../components/ModalOrder';
import { orderFood } from '../../actions/coffee';

class CategoryFoodItem extends Component {

    constructor(props) {
        super(props);
        let totalPrice = 0 
        let numberOfOrder = 0
        props.Coffee.foodOrdered.map((food) => { // eslint-disable-line
            if(food){
                totalPrice += parseInt(food.totalPrice, 10);
                numberOfOrder += food.foodQuantity;
            }
        })
        this.listItems = this.props.navigation.getParam('listItems');
        this.state = ({
            numberOfOrder,
            totalPrice,
        })
    }

    componentWillReceiveProps(nextProps){
        let totalPrice = 0 
        let numberOfOrder = 0
        nextProps.Coffee.foodOrdered.map((food) => { // eslint-disable-line
            if(food){
                totalPrice += parseInt(food.totalPrice, 10);
                numberOfOrder += food.foodQuantity;
            }
        })
        this.setState({
            totalPrice,
            numberOfOrder,
        })
    }

    onCheckout = () => {
        if(this.state.numberOfOrder > 0)
            this.props.navigation.navigate('ConfirmOrder')
        else 
            Alert.alert('Vui lòng chọn đồ uống để tiếp tục')
    }

    handleSelectToping = (item) => {
        this.openModal.showAddModal(item, this.listItems.id, this.listItems.toping)
    }

    handleOrderFood = (foodOrder) => {
        this.props.orderFood(foodOrder);
    }

    renderItem = (item) => (
        <TouchableOpacity
            onPress={() => this.handleSelectToping(item)}
            style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <Image style={styles.image} source={{ uri: images.defaultImageFood }} />
                <View style={styles.foodInfo}>
                    <Text>{item.name}</Text>
                    <Text>{formatMoney(item.value)} đ</Text>
                </View>
            </View>
            <Ionicons name='ios-add-circle-outline' size={23} />
        </TouchableOpacity>
    )

    render() {
        return (
            <View style={styles.container} >
                {
                    this.state.isLoading ? this.renderLoading() :
                    <View style={{flex: 1}}>
                        <FlatList
                            data={this.listItems.subFood}
                            renderItem={({ item }) => this.renderItem(item)}
                            keyExtractor={(item, index) => `${item.id}${index}`}
                        />
                        <TouchableOpacity style={styles.confirmOrder} onPress={this.onCheckout}>
                            <Text style={styles.itemOrder}>{this.state.numberOfOrder} phần</Text>
                            <View style={styles.shopCart}>
                                <MaterialCommunityIcons name='cart-outline' size={23} color={colors.WHITE} />
                                <Text style={{color: colors.WHITE, fontWeight: 'bold'}}>Đặt món</Text>
                            </View>
                            <View style={styles.itemPrice}><Text style={{color: colors.WHITE}}>{formatMoney(this.state.totalPrice)} đ</Text></View>
                        </TouchableOpacity>
                    </View>
                }
                <ModalOrder ref={(ref) => { this.openModal = ref }} orderFood={this.handleOrderFood} />
            </View>
        );
    }
}

const mapStateToProps = ({ Coffee }) => ({
    Coffee,
});

const mapDispatchToProps = {
    orderFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFoodItem);
