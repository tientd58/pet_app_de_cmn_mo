import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center',
    }
});

const Close = ({ onPress }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <MaterialCommunityIcons name="window-close" size={21} color={colors.WHITE} />
    </TouchableOpacity>
);

export default Close;
