import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, ActivityIndicator, Keyboard, Alert, TextInput, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { formatMoney } from '../../utils/common';
import ButtonPrimary from '../../components/ButtonPrimary';
import FoodBillDetail from '../../components/FoodBillDetail';
import { orderRemoveFood, orderComfirm } from '../../actions/coffee';
import { STORAGE_KEY } from '../../utils/constants';

class ConfirmOrder extends Component {

    constructor(props) {
        super(props);
        let total = 0
        props.Coffee.foodOrdered.map(item => total +=  parseInt(item.totalPrice, 10)) // eslint-disable-line
        this.state = ({
            isLoading: false,
            total, 
            table: '',
            userId: null,
        })
    }

    async componentDidMount() {
        const userId = parseInt(await AsyncStorage.getItem(STORAGE_KEY.AUTH_ID), 10);
        this.setState({ userId });
    }

    componentWillReceiveProps(nextProps) {  
        if(nextProps.Coffee.foodOrdered.length < 1){
            this.props.navigation.goBack()
        }
    }

    onChangeTable = (table) => this.setState({ table });

    handleConfirmOrder = async () => {
        Keyboard.dismiss();
        if(!this.state.table || this.state.table ===''){
            Alert.alert('Vui lòng chọn bàn');
        } else {
            this.toggleLoading();
            const foodArray = [];
            this.props.Coffee.foodOrdered.map(item => { // eslint-disable-line
                const toppings = [];
                item.toppingList.map(topping => { // eslint-disable-line
                    toppings.push({
                        id: topping.id,
                        quantity: 1
                    })
                });
                foodArray.push({
                    foodId: item.cateId,
                    quantity: item.foodQuantity,
                    subFood: item.food.id,
                    toping: toppings
                })
            })

            const payload = {
                table: this.state.table,
                user_id: this.state.userId,
                orders: foodArray,
            };
            await this.props.orderComfirm(payload).then(() => {
                this.renderAlert('Thành công', 'Đặt món thành công.', () => {
                    this.props.navigation.goBack();
                });
            });
            this.toggleLoading();
        }
    }

    removeItemBillConfirm = (index) => {
        const foodOrdered =  [];
        let total = 0;
        this.props.Coffee.foodOrdered.map((f,i) => { // eslint-disable-line
            if(index !== i){
                total +=  parseInt(f.totalPrice, 10)
                foodOrdered.push(f)
            }
        });
        this.setState({ total});
        this.props.orderRemoveFood(foodOrdered);
        if(foodOrdered < 1) this.setState({ total: 0 });
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderAlert = (title, message, onPressOK) => Alert.alert(title, message, [{text: 'OK', onPress: onPressOK}], { cancelable: true })

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    renderItem = ({ item, index }) => (
        <FoodBillDetail
            key={item.id}
            data={item}
            index={index +1}
            removeItem={() => this.removeItemBillConfirm(index)}
        />
    )

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
                {
                    this.state.isLoading ? this.renderLoading() :
                    <View style={{flex: 1}}>
                        <FlatList
                            data={this.props.Coffee.foodOrdered}
                            renderItem={this.renderItem}
                            keyExtractor={item => `${item.cateId}${item.foodQuantity}${item.totalPrice}`}
                        />
                        <View style={styles.itemInput}>
                            <Text style={styles.labelInput}>Bàn đặt</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor='#FFFFFF'
                                autoCapitalize="none"
                                onChangeText={text => this.onChangeTable(text)}
                                value={this.state.table}
                                keyboardType='default'
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={styles.totalPriceContainer}>
                            <Text style={styles.totalPrice}>Tổng tiền:</Text>
                            <Text style={styles.totalPrice}>{formatMoney(this.state.total)} đ</Text>
                        </View>
                        <ButtonPrimary text='Xác nhận' onPress={this.handleConfirmOrder} />
                    </View>
                }
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = ({ Coffee, Auth }) => ({
    Coffee,
    Auth,
});

const mapDispatchToProps = {
    orderRemoveFood,
    orderComfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);
