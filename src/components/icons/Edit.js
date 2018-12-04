import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 15,
        justifyContent: 'center',
    }
});

const Edit = ({ onPress }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <FontAwesome name="edit" size={25} color={colors.WHITE} />
    </TouchableOpacity>
);

export default Edit;
