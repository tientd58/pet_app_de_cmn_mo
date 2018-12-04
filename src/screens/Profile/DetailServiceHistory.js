import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import { formatMoney } from '../../utils/common';
import { colors } from '../../utils/constants';

class DetailServiceHistory extends Component {

    constructor(props) {
        super(props);
        this.services = props.navigation.getParam('data');
    }

    renderItem = ({ item, index }) => (
        <View style={styles.containerBill}>
            <View style={styles.subFood}>
                <Text>{index + 1}. {item.service.name}</Text>
            </View>
            <View>
            {/* { */}
                {/* item.subService.map((ele) => ( */}
                    <View style={styles.itemTopping}>
                        <Text style={styles.textTopping}>[{item.subService.name}]</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            
                            <Text style={styles.textTopping}>{formatMoney(item.subService.value)} đ</Text>
                        </View>
                    </View>
                {/* )) */}
            {/* } */}
            </View>
            <View style={{borderBottomColor: colors.GRAY_DEFAULT, borderBottomWidth: 0.5, marginTop: 5}} />
            <View style={styles.itemTotal}>
                <Text>Giá: </Text>
                <Text>{formatMoney(item.subService.value)} đ</Text>
            </View>
            <View style={{borderBottomColor: colors.GRAY_1}} />
        </View>
    )

    render() {
        return (
            <View style={styles.container} >
                <View style={{flex: 1}}>
                    <Text style={[styles.date, {marginVertical: 20}]}>
                        Ngày: {moment(this.services.date * 1000).format('DD/MM/YYYY').toString()} {moment(this.services.start * 1000).format('hh:mm A')}
                    </Text>
                    <FlatList
                        data={this.services.orders}
                        renderItem={this.renderItem}
                        extraData={this.data}
                        keyExtractor={(item, index) => `${item.serviceName}${index}`}
                    />
                    <View style={styles.totalPriceContainer}>
                        <Text style={styles.totalPrice}>Tổng tiền:</Text>
                        <Text style={styles.totalPrice}>{formatMoney(this.services.totalPrice)} đ</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailServiceHistory);
