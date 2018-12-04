import { StyleSheet } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    buttonConfirm: {
        backgroundColor: colors.BUTTON_DEFAULT,
        borderRadius: 4,
        padding: 15,
        margin: 10,
    },
    textButtonConfirm: {
        textAlign: 'center', 
        color: colors.WHITE,
        fontWeight: 'bold'
    },
});

export default styles;