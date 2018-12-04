import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        borderBottomColor: colors.GRAY_1,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width - 20,
        marginHorizontal: 10,
        alignItems: 'center',
        // paddingVertical: 10,
    },
    itemContent :{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: 30,
        height: 40,
        borderRadius: 4,
    },
    foodInfo: {
        marginLeft: 10,
    },
    modalContainer: {
        // justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: '100%',
    },
    contentContainer: {
        backgroundColor: colors.BACKGROUND,
        width: '100%',
        justifyContent: 'flex-end',
    },
    modalTitle: {
        borderBottomWidth: 1,
        flexDirection: 'column',
        borderBottomColor: '#ececec',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 70,
        paddingBottom: 10
    },
    modalTitleText: {
        lineHeight: 24,
        fontSize: 18,
        fontWeight: "700",
        color: colors.WHITE
    },
    foodQuantity: {
        fontSize: 20,
    },
    foodPayToping: {
        backgroundColor: 'orange',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginTop: 20,
        padding: 15,
    },
    confirmOrder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: colors.BUTTON_DEFAULT
    },
    modal: {
        // justifyContent: 'center',
        shadowRadius: 10,
        width: Dimensions.get('window').width - 80,
        height: 480,
        borderRadius: Platform.OS === 'ios' ? 10 : 0
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.GRAY_DEFAULT,
        padding: 10,
        borderRadius: 4,
    }
});

export default styles;