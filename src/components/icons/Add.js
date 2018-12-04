import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 15,
        justifyContent: 'center',
    }
});

const Add = ({ onPress }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Entypo name="plus" size={25} color={colors.WHITE} />
    </TouchableOpacity>
);

export default Add;
