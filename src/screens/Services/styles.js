import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    imageItem: {
        width: (Dimensions.get('window').width - 20) / 2 - 5,
        height: ((Dimensions.get('window').width - 20) / 2) - 5,
        borderRadius: 5,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    imageContainer: {
        marginLeft: 5,
        marginTop: 10,
    },
    nameCategory: {
        position: 'absolute',
        zIndex: 99,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.WHITE,
        bottom: 20
    },
    imageContent: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
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
    foodInfo: {
        marginLeft: 10,
    },
    totalPriceContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-between'
    },
    totalPrice: {
        paddingHorizontal: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.RED,
    },
    itemInputDate: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: colors.GRAY_2,
        marginTop: 5,
        marginBottom: 10,
        width: (Dimensions.get('window').width - 20) / 3,
        marginHorizontal: 10,
    },
    itemInputTime: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: colors.GRAY_2,
        marginTop: 5,
        marginBottom: 10,
        width: ((Dimensions.get('window').width - 20) / 3) - 5,
    },
    labelInput: {
        color: colors.GRAY_3,
    },
    input: {
        paddingTop: 5,
    },
    titleCollapseHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 10,
        backgroundColor: colors.GRAY_DEFAULT,
        borderBottomColor: colors.GRAY_1,
        borderBottomWidth: 1,
        alignItems: 'center',
        marginBottom: 3,
        borderRadius: 4
    },
});

export default styles;