import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import styles from './styles';
import { getServicesByCategory, orderService, clearServiceOrdered } from '../../actions/service';
import { formatMoney } from '../../utils/common';
import ButtonPrimary from '../../components/ButtonPrimary';
import { colors } from '../../utils/constants';

class ServiceByCategory extends Component {

    constructor(props) {
        super(props);
        this.categoryId = props.navigation.getParam('categoryId');
        this.state = {
            isLoading: false,
            numberOfOrder: false,
            serviceList : [],
        }
    }

    async componentDidMount() {
        this.props.navigation.setParams({ handleBack: this.handleGoBack})
        this.toggleLoading();
        await this.props.getServicesByCategory(this.categoryId);
        this.setState({
            serviceList: this.props.Service.listServices
        });
        this.toggleLoading();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            serviceList: nextProps.Service.listServices,
        });
    }

    onPressSubService = (itemSub, serviceId) => {
        const serviceList = this.state.serviceList;
        serviceList.map((item, index) => { // eslint-disable-line
            if(serviceId === item.id) {
                item.subService.map((sub, i) => { // eslint-disable-line
                    if(sub.id === itemSub.id) {
                        serviceList[index].subService[i].select = !serviceList[index].subService[i].select;
                        this.setState({ serviceList });
                    }
                })
            }
        })
    }

    handleGoBack = async () => {
        await this.props.clearServiceOrdered().then(() => this.props.navigation.goBack());
    }

    checkNewServicesSelected = (currentServicesSelected, oldServices) => {
        let check = 0;
        if (oldServices.length === 0) return 1;
        currentServicesSelected.map(item => { // eslint-disable-line
            if (oldServices.includes(item) === false) check += 1;
        })
        return check;
    }

    handleOrderService = () => {

        let serviceSelected = 0;
        const serviceOrdered = [];
        this.state.serviceList.map((item) => { // eslint-disable-line
            const subService = [];
            let totalPrice = 0;
            item.subService.map((sub, index) => { // eslint-disable-line
                if (sub.select === true) {
                    serviceSelected =+ 1;
                    totalPrice = parseInt(totalPrice, 10) + parseInt(sub.value, 10);
                    subService.push(sub);
                }
                if (index === item.subService.length - 1 && subService.length > 0) {
                    serviceOrdered.push({
                        serviceName: item.name,
                        serviceId: item.id,
                        subService,
                        totalPrice,
                    });
                }
            })
        });
        if (serviceSelected === 0) {
            return Alert.alert('Chọn dịch vụ để tiếp tục');
        }

        const check = this.checkNewServicesSelected(serviceOrdered, this.props.Service.serviceOrdered);
        if (check === 0 && (serviceOrdered.length < this.props.Service.serviceOrdered.length)) {
            this.props.orderService(serviceOrdered, this.state.serviceList);
            this.props.navigation.navigate('ConfirmServices');
        } else if (check > 0) {
            this.props.orderService(serviceOrdered, this.state.serviceList);
            this.props.navigation.navigate('ConfirmServices');
        } else {
            this.props.navigation.navigate('ConfirmServices');
        }
    }

    handleGetServiceByCategory = (item) => {
        this.props.navigation.navigate('CategoryFoodItem', {
            header: item.name
        })
    }

    updateIsCollapsed = (status, item) => {
        const itemService = item;
        itemService.isCollapsed = status;
        const newListService = this.state.serviceList.map(ele => {
            if (ele.id === item.id) return itemService;
            return ele;
        });
        this.setState({ serviceList: newListService });
    }

    toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });
    
    renderLoading = () => <View style={styles.loadingView}><ActivityIndicator size='large' color="#00ff00"/></View>

    renderServiceItem = ({ item }) => (
        <Collapse
            isCollapsed={item.isCollapsed} 
            onToggle={(isCollapsed) => this.updateIsCollapsed(isCollapsed, item)}
        >
            <CollapseHeader>
                <View style={styles.titleCollapseHeader}>
                {
                    item.isCollapsed ? <Entypo name='minus' size={23} color={colors.ORANGE_DEFAULT} />
                    : <MaterialIcons name='add' size={23} color={colors.ORANGE_DEFAULT} />
                }
                    <Text style={{paddingLeft: 10}}>{item.name}</Text>
                </View>
            </CollapseHeader>
            <CollapseBody>
                {
                    item.subService.map(sub => (
                        <TouchableOpacity
                            key={sub.id}
                            onPress={() => this.onPressSubService(sub, item.id) }
                            style={[styles.itemContainer, { paddingVertical: 10 }]}>
                            <View style={styles.itemContent}>
                                <CheckBox
                                    isChecked={sub.select}
                                    onClick={() => this.onPressSubService(sub, item.id) }
                                    checkBoxColor='gray'
                                />
                                <View style={styles.foodInfo}>
                                    <Text>{sub.name}</Text>
                                </View>
                            </View>
                            <Text style={{fontSize: 13}} >{formatMoney(sub.value)} đ</Text>
                        </TouchableOpacity>
                    ))
                }
            </CollapseBody>
        </Collapse>
    )

    render() {
        if (this.state.serviceList.length > 0) {
            return (
                <View style={styles.container}>
                    {
                        this.state.isLoading ? this.renderLoading() :
                        <View style={{flex: 1, justifyContent: 'space-around'}}>
                            <View style={{flex: 1, margin: 10}}>
                                <FlatList
                                    data={this.state.serviceList}
                                    extraData={this.state}
                                    renderItem={this.renderServiceItem}
                                    keyExtractor={(item, index) => `${item.id}${index}`}
                                />
                            </View>
                            <ButtonPrimary text='Đặt lịch' onPress={this.handleOrderService} />
                        </View>
                    }
                </View>
            );
        }
        return (
            <View>
                <Text>Hiện chưa có dịch vụ nào</Text>
            </View>
        );
    }
}

const mapStateToProps = ({ Service }) => ({
    Service,
});

const mapDispatchToProps = {
    getServicesByCategory,
    orderService,
    clearServiceOrdered,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceByCategory);
