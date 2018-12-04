import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    titlePage: {
        textAlign: 'center',
        color: colors.WHITE,
        fontWeight: 'bold'
    },
    formContainer: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    itemInput: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: colors.WHITE,
        marginTop: 5,
    },
    labelInput: {
        color: colors.GRAY_3,
    },
    input: {
        paddingTop: 5,
    },
    buttonConfirm: {
        backgroundColor: colors.WHITE,
        borderRadius: 22,
        padding: 15,
        marginTop: 30,
        marginBottom: 15,
        marginHorizontal: Dimensions.get('window').width / 4
    },
    textButtonConfirm: {
        textAlign: 'center', 
        color: colors.ORANGE_DEFAULT,
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});

export default styles;