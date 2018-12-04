import React, { Component } from 'react';
import { TouchableOpacity, Text, View, FlatList, Image, Modal } from 'react-native';
import CheckBox from 'react-native-check-box';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import styles from './styles';
import { formatMoney } from '../../utils/common';
import { colors } from '../../utils/constants';

export default class ModalOrder extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            foodQuantity: 1,
            food: {},
            totalPrice: 0,
            toppingList: [],
            cateId: '',
            modalVisible:  false,
        })
    }

    onPressTopping = (item) => {

        if(item.select){
            this.setState({
                totalPrice: parseInt(this.state.totalPrice, 10) - parseInt(item.value, 10)
             })
        }else{
            this.setState({
                totalPrice: parseInt(this.state.totalPrice, 10) + parseInt(item.value, 10)
             })
        }
        const toppingArray = this.state.toppingList.map(topping => {
            if(topping.id === item.id){
                return {
                    ...topping,
                    select: !topping.select,
                }
            }
            return topping;
        });
        this.setState({
            toppingList: toppingArray
         })
    }

    onPressIncreaseFood = () => { 
        this.setState({
            foodQuantity: this.state.foodQuantity + 1, 
            totalPrice: parseInt(this.state.totalPrice, 10) + parseInt(this.state.food.value, 10)
            })
    }
    onPressDecreaseFood = () => {
         if (this.state.foodQuantity > 0)
            this.setState({
                foodQuantity: this.state.foodQuantity - 1, 
                totalPrice: parseInt(this.state.totalPrice, 10) - parseInt(this.state.food.value, 10)
            })
    }

    setModalVisible = (status) => this.setState({ modalVisible: status, foodQuantity: 1 });

    showAddModal = (foodData, cateId, toppings) => { 
        const newTopping = toppings.map((item) => {
            const newItem = Object.assign({}, item, { select: false });
            return newItem;
        });
        this.setState({ 
            food: foodData,
            totalPrice: foodData.value,
            toppingList: newTopping,
            cateId,
        });
        this.setModalVisible(true);
    }

    addOrder = () => {
        const toppingSlected = [];
        const toppingArray = this.state.toppingList;
        toppingArray.map((topping) => topping.select ? toppingSlected.push(topping) : null);

        const foodOrder = {
            cateId: this.state.cateId,
            food: this.state.food,
            foodQuantity: this.state.foodQuantity,
            toppingList: toppingSlected,
            totalPrice: this.state.totalPrice,
        };
        this.props.orderFood(foodOrder);
        this.setModalVisible(false);
    }

    renderItemToping = (item) => (
        <TouchableOpacity
            onPress={() => this.onPressTopping(item) }
            style={[styles.itemContainer, { paddingVertical: 10 }]}>
            <View style={styles.itemContent}>
                <CheckBox 
                    isChecked={item.select}
                    onClick={() => this.onPressTopping(item) }
                    checkBoxColor='gray'
                />
                <View style={styles.foodInfo}>
                    <Text>{item.name}</Text>
                </View>
            </View>
            <Text style={{fontSize: 13}} >{formatMoney(item.value)} đ</Text>
        </TouchableOpacity>
    )

    renderFooter = () => (  
        <TouchableOpacity onPress={() => this.addOrder()}>
            <View style={styles.foodPayToping}>
                <Text style={{ color: colors.RED, fontSize: 14, fontWeight: 'bold' }}>
                    {formatMoney(this.state.totalPrice)} đ
                </Text> 
            </View>
            <TouchableOpacity style={{paddingVertical: 10}} onPress={() => this.setModalVisible(false)}>
                <Text style={{textAlign: 'center'}}>Lựa chọn món khác</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )

    renderModal = () => (
        <Modal
            visible={this.state.modalVisible}
            style={styles.modal}
            animationType="slide"
            onClose={() => {}}
            position='center'
            backdrop
        >
            <View style={styles.modalContainer} >
                <View style={[styles.contentContainer]}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleText}>Toping</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.itemContent}>
                        <Image style={styles.image} size={80} source={{ uri: 'https://orig00.deviantart.net/f7f6/f/2012/074/f/2/boba_tea__by_crysanity-d4svraj.png' }} />
                        <View style={styles.foodInfo}>
                            <Text>{this.state.food.name}</Text>
                            <Text>{this.state.food.value} đ</Text>
                        </View>
                    </View>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => this.onPressDecreaseFood()} style={{paddingRight: 20}}>
                            <Entypo name='minus' size={23} />
                        </TouchableOpacity>
                        <Text style={styles.foodQuantity}>{this.state.foodQuantity}</Text>
                        <TouchableOpacity onPress={() => this.onPressIncreaseFood()} style={{paddingLeft: 20}}>
                            <MaterialIcons name='add' size={23} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={this.state.toppingList}
                    renderItem={({ item }) => this.renderItemToping(item)}
                    keyExtractor={(item, index) => `${item.id}${index}`}
                />
                { this.renderFooter() }
            </View>    
        </Modal>
    )

    render() {
        return this.renderModal();
    }
}