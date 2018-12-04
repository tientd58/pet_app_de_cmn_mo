import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 15,
        justifyContent: 'center',
    }
});

const Save = ({ onPress }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={25} color='green' />
    </TouchableOpacity>
);

export default Save;
