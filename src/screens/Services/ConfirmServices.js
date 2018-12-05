import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import styles from './styles';

class ConfirmServices extends Component {

    render() {
        return (
            <View style={styles.container} >
                <Text>huhu</Text>
            </View>
        );
    }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmServices);
