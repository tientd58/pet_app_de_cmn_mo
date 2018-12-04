import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width - 20,
        justifyContent: 'center',
        margin: 10,
        borderBottomColor: colors.RED,
        borderBottomWidth: 1,
        // borderStyle: 'dashed'
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
});

export default styles;