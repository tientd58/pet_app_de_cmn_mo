import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import styles from './styles';

class DetailOrderHistory extends Component {

    render() {
        return (
            <View style={styles.container} >
                <Text>cc</Text>
            </View>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderHistory);
