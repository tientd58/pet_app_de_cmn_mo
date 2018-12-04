import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: colors.BLACK,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modal: {
        // justifyContent: 'center',
        shadowRadius: 10,
        width: Dimensions.get('window').width,
        height: 480,
        borderRadius: Platform.OS === 'ios' ? 10 : 0
    },
    imageItem: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width - 50,
    },
    imageContent: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default styles;