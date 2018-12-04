import React, {Component} from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../utils/constants';
import { formatMoney } from '../../utils/common';

class FoodBillDetail extends Component {

    render() {
        const { index, data, removeItem } = this.props;
        return ( 
            <View style={styles.container}>
                <View style={styles.subFood}>
                    <Text>{index}. {data.food.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={removeItem} style={{marginRight: 5}}>
                            <MaterialCommunityIcons name='minus-circle-outline' size={22} color='orange' />
                        </TouchableOpacity>
                        <Text>{formatMoney(data.food.value)} đ</Text>
                    </View>
                </View>
                <View style={styles.topping}>
                {
                    data.toppingList.map((item) => (
                        <View key={item.id} style={styles.itemTopping}>
                            <Text style={styles.textTopping}>- {item.name}</Text>
                            <Text style={styles.textTopping}>{formatMoney(item.value)} đ</Text>
                        </View>
                    ))
                }
                </View>
                <View style={styles.quantity}>
                    <Text>Số lượng: </Text>
                    <Text>{data.foodQuantity}</Text>
                </View>
                <View style={{borderBottomColor: colors.GRAY_DEFAULT, borderBottomWidth: 0.5}} />
                <View style={styles.itemTotal}>
                    <Text>Giá: </Text>
                    <Text>{formatMoney(data.totalPrice)} đ</Text>
                </View>
                <View style={{borderBottomColor: colors.GRAY_1}} />
            </View>
        )
    }
}

export default FoodBillDetail