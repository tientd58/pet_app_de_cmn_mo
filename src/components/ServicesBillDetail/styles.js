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
    },
    subFood: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    topping: {
    },
    itemTopping: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 5
    },
    textTopping: {
        color: colors.GRAY_3,
    },
    itemTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingVertical: 10,
    },
});

export default styles;