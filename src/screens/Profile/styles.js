import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    userInfo :{
        flexDirection: 'row',
        // alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.WHITE,
        marginVertical: 10,
        height: 150,
    },
    avatar: {
        width: 100,
        height: 130,
        borderRadius: 5,
    },
    inforContent: {
        marginLeft: 20,
        height: 130,
        justifyContent: 'space-between'
    },
    menuProfile: {
        padding: 10,
        marginVertical: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.GRAY_1
    },
    titleItem: {
        marginLeft: 10,
    },
    textName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        color: colors.GRAY_3,
        paddingTop: 3
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    buttonEdit: {
        borderRadius: 5,
        borderColor: colors.BLUE_DEFAULT,
        borderWidth: 1,
        marginTop: 5,
        width: 100
    },
    textEditBotton: {
        textAlign: 'center',
        paddingVertical: 7,
    },

    // edit profile
    avatarUser: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.GRAY_2,
        marginVertical: 10,
    },
    imageAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    iconEditImage: {
        position: 'absolute',
        bottom: 0,
        left: 80,
    },
    ServicesInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50,
        borderRadius: 5,
        backgroundColor: colors.GRAY_DEFAULT,
        marginBottom: 10,
        flexDirection: 'row',
    },
    itemOutOfServices: {
        flex: 1,
        marginVertical: 10,
        borderRightWidth: 1,
        borderRightColor: colors.GRAY_1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemOutOfCoffee: {
        flex: 1,
        marginVertical: 10,
        borderLeftWidth: 1,
        borderLeftColor: colors.GRAY_1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outOfNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.ORANGE_DEFAULT
    },
    itemInput: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: colors.GRAY_2,
        marginTop: 5,
    },
    labelInput: {
        color: colors.GRAY_3,
    },
    input: {
        paddingTop: 5,
    },
    buttonConfirm: {
        backgroundColor: colors.BLUE_DEFAULT,
        borderRadius: 4,
        padding: 15,
        marginTop: 10,
    },
    textButtonConfirm: {
        textAlign: 'center', 
        color: colors.WHITE,
        fontWeight: 'bold'
    },

    // order coffee history
    orderContentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderInfo: {
        width: Dimensions.get('window').width / 2,
        marginLeft: 10,
        flexWrap: 'wrap',
    },
    textDateOrderItem: {
        color: colors.GRAY_1,
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'right'
    },
    itemOrderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10
    },
    itemOrderContainer: {
        borderRadius: 5,
        paddingTop: 5,
        width: Dimensions.get('window').width - 20,
        marginTop: 10,
        borderBottomColor: colors.GRAY_1,
        borderBottomWidth: 1,
    },
    orderContentRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textPriceTotal: {
        fontWeight: '600',
        fontSize: 15
    },

    // order detail history
    containerBill: {
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        borderBottomColor: colors.RED,
        borderBottomWidth: 1,
    },
    subFood: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topping: {
        width: (Dimensions.get('window').width / 3) * 2,
    },
    itemTopping: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingTop: 5
    },
    textTopping: {
        color: colors.GRAY_3,
    },
    quantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 10
    },
    itemTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 10,
    },
    totalPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    totalPrice: {
        paddingHorizontal: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.RED,
    },
    table: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        color: colors.GRAY_3
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    imageFood: {
        width: 30,
        height: 40,
        borderRadius: 4,
    },
});

export default styles;