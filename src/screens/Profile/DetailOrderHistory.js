import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { formatMoney } from '../../utils/common';
import { colors } from '../../utils/constants';

class DetailOrderHistory extends Component {

    constructor(props) {
        super(props);
        this.order = props.navigation.getParam('data');
    }

    renderBill = ({ item, index }) => {
        let totalPriceItem = parseInt(item.subFood.value, 10) * parseInt(item.subFood.quantity, 10);
        item.toping.map(e => { // eslint-disable-line
            totalPriceItem += parseInt(e.value, 10);
        });

        return (
            <View style={styles.containerBill}>
                <View style={styles.subFood}>
                    <Text>{index + 1}. {item.subFood.name}</Text>
                    <Text>{formatMoney(item.subFood.value)} đ</Text>
                </View>
                <View style={styles.topping}>
                {
                    item.toping.map((ele) => (
                        <View key={`${ele.id}${ele.value}`} style={styles.itemTopping}>
                            <Text style={styles.textTopping}>- {ele.name}</Text>
                            <Text style={styles.textTopping}>{formatMoney(ele.value)} đ</Text>
                        </View>
                    ))
                }
                </View>
                <View style={styles.quantity}>
                    <Text>Số lượng: </Text>
                    <Text>{item.subFood.quantity}</Text>
                </View>
                <View style={{borderBottomColor: colors.GRAY_DEFAULT, borderBottomWidth: 0.5}} />
                <View style={styles.itemTotal}>
                    <Text>Giá: </Text>
                    <Text>{formatMoney(totalPriceItem)} đ</Text>
                </View>
                <View style={{borderBottomColor: colors.GRAY_1}} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={{flex: 1}}>
                    <View style={styles.totalPriceContainer}>
                        <Text style={styles.table}>Bàn: {this.order.table}</Text>
                        <Text style={styles.date}>Ngày: {moment(this.order.created_at * 1000).format('DD/MM/YYYY').toString()}</Text>
                    </View>
                    <FlatList
                        data={this.order.orders}
                        renderItem={this.renderBill}
                        keyExtractor={(item, index) => `${item.id}${index}`}
                    />
                    <View style={styles.totalPriceContainer}>
                        <Text style={styles.totalPrice}>Tổng tiền:</Text>
                        <Text style={styles.totalPrice}>{formatMoney(this.order.totalPrice)} đ</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderHistory);
