import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { connect } from 'react-redux';
import { getServiceHistory } from '../../actions/profile';
import styles from './styles';
import { images } from '../../utils/constants';
import { formatMoney } from '../../utils/common';

class ServicesHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    async componentDidMount() {
        this.toggleLoading();
        await this.props.getServiceHistory();
        this.toggleLoading();
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderTitle = (item) => {
        let title = '';
        item.orders.map((ele, index) => { // eslint-disable-line
            if (title.includes(ele.service.name) === false) {
                if (index === 0) title += ele.service.name;
                else title += ` - ${ele.service.name}`;
            }
        })
        return (
            <View key={`${item.id}`} style={styles.orderInfo}>
                <Text>{title}</Text>
            </View>)
    }

    renderItemService = ({ item }) => (
        <TouchableOpacity
            style={styles.itemOrderContainer}
            onPress={() => this.props.navigation.push('DetailServiceHistory', {data: item})}>
            <View style={styles.itemOrderContent}>
                <View style={styles.orderContentLeft}>
                    {/* <FontAwesome name='medkit' size={30} color='orange' /> */}
                    <Image style={styles.image} source={images.servicesLogo} />
                    { this.renderTitle(item) }
                </View>
                <Text style={styles.textPriceTotal}>{formatMoney(item.totalPrice)} đ</Text>
            </View>
            <Text style={styles.textDateOrderItem} note>
                {moment(item.start * 1000).format('DD/MM/YYYY').toString()} {moment(item.start * 1000).format('hh:mm A')}
            </Text>
        </TouchableOpacity>
    )

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    render() {
        const listServiceHistory = this.props.Profile.listServiceHistory.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ? this.renderLoading() :
                    <View style={styles.container}>
                        <FlatList
                            data={listServiceHistory}
                            // extraData={this.state}
                            renderItem={this.renderItemService}
                            keyExtractor={(item, index) => `${item.id}${index}`}
                        />
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Profile }) => ({
    Profile,
})

const mapDispatchToProps = {getServiceHistory};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesHistory);
