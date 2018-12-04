import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getOrderHistory } from '../../actions/profile';
import styles from './styles';
import { images } from '../../utils/constants';
import { formatMoney } from '../../utils/common';

class OrderHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    async componentDidMount() {
        this.toggleLoading();
        await this.props.getOrderHistory();
        this.toggleLoading();
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderItemOrder = ({ item }) => (
        <TouchableOpacity
            style={styles.itemOrderContainer}
            onPress={() => this.props.navigation.push('DetailOrderHistory', {data: item})}>
            <View style={styles.itemOrderContent}>
                <View style={styles.orderContentLeft}>
                    {/* <MaterialCommunityIcons name='food' size={40} color='orange' /> */}
                    <Image style={styles.imageFood} source={{ uri: images.defaultImageFood }} />
                    <View style={styles.orderInfo}>
                        <Text>Bàn {item.table}</Text>
                    </View>
                </View>
                <View style={styles.orderContentRight}><Text style={styles.textPriceTotal}>{formatMoney(item.totalPrice)} đ</Text></View>
            </View>
            <Text style={styles.textDateOrderItem}>{moment(item.created_at * 1000).format('DD/MM/YYYY hh:mm A').toString()}</Text>
        </TouchableOpacity>
    )

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        const listOrderHistory = this.props.Profile.listOrderHistory.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ? this.renderLoading() :
                        <FlatList
                            data={listOrderHistory}
                            // extraData={this.state}
                            renderItem={this.renderItemOrder}
                            keyExtractor={(item, index) => `${item.id}${index}`}
                        />
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Profile }) => ({
    Profile,
})

const mapDispatchToProps = {getOrderHistory};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
