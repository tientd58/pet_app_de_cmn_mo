import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

class ChangePassword extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>hihi</Text>
            </View>
        );
    }
}

const  mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
