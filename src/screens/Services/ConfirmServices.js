import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Text, View, FlatList, ActivityIndicator, Keyboard, Alert, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './styles';
import { formatMoney } from '../../utils/common';
import ButtonPrimary from '../../components/ButtonPrimary';
import ServiceBillDetail from '../../components/ServicesBillDetail';
import { orderRemoveService, clearServiceOrdered, orderServiceComfirm } from '../../actions/service';
import { STORAGE_KEY } from '../../utils/constants';

class ConfirmServices extends Component {

    constructor(props) {
        super(props);
        let total = 0;
        props.Service.serviceOrdered.map(item => total +=  parseInt(item.totalPrice, 10)) // eslint-disable-line
        this.state = ({
            isLoading: false,
            total, 
            table: '',
            userId: null,
            isDatePickerVisible: false,
            isTimeFromPickerVisible: false,
            isTimeToPickerVisible: false,
            // time: moment(new Date()).format('DD/MM/YYYY')
            date: null,
            timeFrom: null,
            timeTo: null,
        })
    }

    async componentDidMount() {
        const userId = parseInt(await AsyncStorage.getItem(STORAGE_KEY.AUTH_ID), 10);
        this.setState({ userId });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.Service.serviceOrdered.length < 1){
            this.props.navigation.goBack();
        }
    }

    showDateTimePicker = (type) => {
        if (type === 'date') this.setState({ isDatePickerVisible: true });
        if (type === 'timeFrom') this.setState({ isTimeFromPickerVisible: true });
        if (type === 'timeTo') this.setState({ isTimeToPickerVisible: true });
    }
 
    hideDateTimePicker = () => {
        this.setState({
            isDatePickerVisible: false,
            isTimeFromPickerVisible: false,
            isTimeToPickerVisible: false,
        });
    }
 
    handleDatePicked = (date) => {
        this.setState({ date: moment(date).format('DD/MM/YYYY') });
        this.hideDateTimePicker();
    };

    handleTimeFrom = (time) => {
        this.setState({ timeFrom: moment(time).format('hh:mm A') });
        this.hideDateTimePicker();
    }

    handleTimeTo = (time) => {
        this.setState({ timeTo: moment(time).format('hh:mm A') });
        this.hideDateTimePicker();
    }

    handleConfirmOrder = async () => {
        Keyboard.dismiss();
        if(this.state.time === null || this.state.timeFrom === null || this.state.timeTo === null){
            Alert.alert('Vui lòng chọn ngày giờ');
        } else {
            this.toggleLoading();
            const servicesArray = [];
            this.props.Service.serviceOrdered.map(item => { // eslint-disable-line
                item.subService.map(sub => { // eslint-disable-line
                    servicesArray.push({
                        service_id: sub.service_id,
                        subService: sub.id,
                        quantity: 1,
                    })
                });
            })

            const payload = {
                date: this.state.date,
                start: this.state.timeFrom,
                end: this.state.timeTo,
                orders: servicesArray,
            };
            await this.props.orderServiceComfirm(payload, this.handleResetService()).then(() => {
                this.renderAlert('Thành công', 'Đặt lịch dịch vụ thành công.', () => {
                    this.props.clearServiceOrdered();
                    this.props.navigation.popToTop();
                });
            });
            this.toggleLoading();
        }
    }

    handleResetService = () => {
        const serviceList = this.props.Service.listServices;
        serviceList.map((item, index) => { // eslint-disable-line
            item.subService.map((sub, i) => { // eslint-disable-line
                if(sub.select === true) {
                    serviceList[index].subService[i].select = false;
                }
            })
        });
        return serviceList;
    }

    handleUnselecteSubservice = (serviceId) => {
        const serviceList = this.props.Service.listServices;
        serviceList.map((item, index) => { // eslint-disable-line
            if(serviceId === item.id) {
                item.subService.map((sub, i) => { // eslint-disable-line
                    if(sub.select === true) {
                        serviceList[index].subService[i].select = false;
                    }
                })
            }
        });
        return serviceList;
    }

    // removeItemBillConfirm = (serviceIndex, subId, itemValue, priceServices, serviceId) => {
    //     const serviceOrdered =  this.props.Service.serviceOrdered;
    //     let total = 0;
    //     const subService = serviceOrdered[serviceIndex].subService;
    //     const removeIndex = serviceOrdered[serviceIndex].subService.findIndex(ele => ele.id === subId);
    //     total = parseInt(this.state.total, 10) - parseInt(itemValue, 10);
    //     serviceOrdered[serviceIndex].totalPrice = parseInt(priceServices, 10) - parseInt(itemValue, 10);
        
    //     if (serviceOrdered[serviceIndex].subService.length === 1) {
    //         serviceOrdered.splice(serviceIndex, 1);
    //     } else {
    //         subService.splice(removeIndex, 1);
    //         serviceOrdered[serviceIndex].subService = subService;
    //     }
    //     this.setState({total});
    //     this.props.orderRemoveService(serviceOrdered, this.handleUnselecteSubservice(subId, serviceId));
    //     if(serviceOrdered < 1) this.setState({ total: 0 });
    // }

    removeItemBillConfirm = (serviceIndex, priceServices, serviceId) => {
        const serviceOrdered =  this.props.Service.serviceOrdered;
        let total = 0;
        total = parseInt(this.state.total, 10) - parseInt(priceServices, 10);
        serviceOrdered.splice(serviceIndex, 1);
        this.setState({total});
        this.props.orderRemoveService(serviceOrdered, this.handleUnselecteSubservice(serviceId));
        if(serviceOrdered < 1) this.setState({ total: 0 });
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderAlert = (title, message, onPressOK) => Alert.alert(title, message, [{text: 'OK', onPress: onPressOK}], { cancelable: true })

    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    renderItem = ({ item, index }) => (
        <ServiceBillDetail
            key={item.id}
            data={item}
            index={index +1}
            removeItem={this.removeItemBillConfirm}
        />
    )

    render() {
        return (
            <View style={styles.container} >
                {
                    this.state.isLoading ? this.renderLoading() :
                    <View style={{flex: 1}}>
                        <FlatList
                            data={this.props.Service.serviceOrdered}
                            renderItem={this.renderItem}
                            extraData={this.data}
                            keyExtractor={(item, index) => `${item.serviceName}${index}`}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.itemInputDate}
                                onPress={() => this.showDateTimePicker('date')}
                            >
                                <Text style={styles.labelInput}>Ngày</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor='#FFFFFF'
                                    autoCapitalize="none"
                                    value={this.state.date}
                                    underlineColorAndroid='transparent'
                                    editable={false}
                                    
                                />
                                <DateTimePicker
                                    isVisible={this.state.isDatePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.itemInputTime, {marginRight: 3}]}
                                onPress={() => this.showDateTimePicker('timeFrom')}
                            >
                                <Text style={styles.labelInput}>Giờ (từ)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor='#FFFFFF'
                                    autoCapitalize="none"
                                    value={this.state.timeFrom}
                                    underlineColorAndroid='transparent'
                                    editable={false}
                                />
                                <DateTimePicker
                                    isVisible={this.state.isTimeFromPickerVisible}
                                    onConfirm={this.handleTimeFrom}
                                    onCancel={this.hideDateTimePicker}
                                    mode='time'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.itemInputTime, {marginRight: 10}]}
                                onPress={() => this.showDateTimePicker('timeTo')}
                            >
                                <Text style={styles.labelInput}>(đến)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor='#FFFFFF'
                                    autoCapitalize="none"
                                    value={this.state.timeTo}
                                    underlineColorAndroid='transparent'
                                    editable={false}
                                />
                                <DateTimePicker
                                    isVisible={this.state.isTimeToPickerVisible}
                                    onConfirm={this.handleTimeTo}
                                    onCancel={this.hideDateTimePicker}
                                    mode='time'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.totalPriceContainer}>
                            <Text style={styles.totalPrice}>Tổng tiền:</Text>
                            <Text style={styles.totalPrice}>{formatMoney(this.state.total)} đ</Text>
                        </View>
                        <ButtonPrimary text='Xác nhận' onPress={this.handleConfirmOrder} />
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = ({ Service, Auth }) => ({
    Service,
    Auth,
});

const mapDispatchToProps = {
    orderRemoveService,
    clearServiceOrdered,
    orderServiceComfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmServices);
