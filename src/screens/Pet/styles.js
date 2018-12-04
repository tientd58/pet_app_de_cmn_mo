import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: colors.WHITE,
    },
    itemContainer: {
        borderBottomColor: colors.GRAY_1,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
    },
    itemContent :{
        flexDirection: 'row',
        paddingTop: 10,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 4,
    },
    petInfo: {
        marginLeft: 10,
        height: 60,
        justifyContent: 'space-between'
    },
    textDateUpdate: {
        color: colors.GRAY_1,
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'right',
        paddingBottom: 5
    },
    textPetinfo: {
        color: colors.GRAY_3,
        paddingBottom: 3
    },

    // add new pet
    formContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.WHITE,
        marginVertical: 10,
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

    // pet detail
    petProfile :{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.WHITE,
        marginVertical: 10,
        height: 130,
    },
    avatar: {
        width: 80,
        height: 110,
        borderRadius: 5,
        marginLeft: 10,
    },
    inforContent: {
        marginLeft: 20,
        height: 110,
        justifyContent: 'space-between'
    },
    textName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textDescription: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    textInfo: {
        color: colors.GRAY_3,
        paddingTop: 5
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonEdit: {
        borderRadius: 5,
        borderColor: colors.BLUE_DEFAULT,
        borderWidth: 1,
        marginTop: 5,
        width: 100
    },
    buttonDelete: {
        borderRadius: 5,
        borderColor: colors.RED,
        borderWidth: 1,
        marginTop: 5,
        width: 60,
        marginLeft: 10,
    },
    textEditBotton: {
        textAlign: 'center',
        paddingVertical: 7,
    },
    imageItem: {
        width: (Dimensions.get('window').width - 20) / 3,
        height: ((Dimensions.get('window').width - 20) / 3) - 30,
        borderRadius: 5,
        marginHorizontal: 2,
        marginBottom: 2,
    },
    imageContainer: {
        marginLeft: 4,
        marginTop: 20,
    },
    imagePetContainer: {
        flexDirection: 'row',
        width: (Dimensions.get('window').width - 20) / 4 - 10,
        height: ((Dimensions.get('window').width - 20) / 4) - 40,
        marginRight: 5
    },
    deleteImage: {
        right: 11,
        top: -8,
    },
    selectImageItem: {
        width: (Dimensions.get('window').width - 20) / 4 - 10,
        height: ((Dimensions.get('window').width - 20) / 4) - 40,
        borderRadius: 5,
        marginHorizontal: 2,
        marginBottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;