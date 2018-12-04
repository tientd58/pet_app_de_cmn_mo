import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({

    contentContainer: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
    },
    topContainer: {
        flex: 2
    },
    logoContainer: {
        marginTop: Platform.OS === 'ios' ? 26 : 0,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContent: {
        resizeMode: 'contain',
    },
    titleOmni: {
        color: '#FFFFFF', 
        fontSize: 18,
    },
    titleClean: {
        color: '#FFFFFF',
        fontSize: 35,
    },
    formContainer: {
        flex: 1,
    },
    inputContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        borderRadius: 5,
        backgroundColor: colors.WHITE,
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
    },
    iconInput: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formItem: {
        paddingHorizontal: 10,
        height: 50,
    },
    itemInput: {
        borderColor: 'transparent',
        color: '#FFFFFF',
    },
    buttonContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 22,
        padding: 15,
        marginTop: 30,
        marginBottom: 15,
        marginHorizontal: Dimensions.get('window').width / 4
    },
    textButton: {
        textAlign: 'center', 
        color: colors.ORANGE_DEFAULT,
        fontWeight: 'bold',
        fontSize: 16
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    forgetPassword: {
        paddingVertical: 10,
        alignItems: 'flex-end',
        marginRight: 10
    }
});

export default styles;