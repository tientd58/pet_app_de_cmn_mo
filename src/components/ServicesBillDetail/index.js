import React, {Component} from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../utils/constants';
import { formatMoney } from '../../utils/common';

class ServiceBillDetail extends Component {

    render() {
        const { index, data, removeItem } = this.props;
        return ( 
            <View style={styles.container}>
                <View style={styles.subFood}>
                    <Text>{index}. {data.serviceName}</Text>
                    <TouchableOpacity
                        onPress={() => removeItem(index - 1, data.totalPrice, data.serviceId)}
                        style={{marginRight: 5}}
                    >
                        <MaterialCommunityIcons name='minus-circle-outline' size={22} color='orange' />
                    </TouchableOpacity>
                </View>
                <View style={styles.topping}>
                {
                    data.subService.map((item) => (
                        <View key={item.id} style={styles.itemTopping}>
                            <Text style={styles.textTopping}>[{item.name}]</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                
                                <Text style={styles.textTopping}>{formatMoney(item.value)} đ</Text>
                            </View>
                        </View>
                    ))
                }
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

export default ServiceBillDetail

/* <View style={styles.container}>
    <View style={styles.subFood}>
        <Text>{index}. {data.serviceName}</Text>
    </View>
    <View style={styles.topping}>
    {
        data.subService.map((item) => (
            <View key={item.id} style={styles.itemTopping}>
                <Text style={styles.textTopping}>[{item.name}]</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => removeItem(index - 1, item.id, item.value, data.totalPrice, data.serviceId)}
                        style={{marginRight: 5}}
                    >
                        <MaterialCommunityIcons name='minus-circle-outline' size={22} color='orange' />
                    </TouchableOpacity>
                    <Text style={styles.textTopping}>{formatMoney(item.value)} đ</Text>
                </View>
            </View>
        ))
    }
    </View>
    <View style={{borderBottomColor: colors.GRAY_DEFAULT, borderBottomWidth: 0.5}} />
    <View style={styles.itemTotal}>
        <Text>Giá: </Text>
        <Text>{formatMoney(data.totalPrice)} đ</Text>
    </View>
    <View style={{borderBottomColor: colors.GRAY_1}} />
</View> */