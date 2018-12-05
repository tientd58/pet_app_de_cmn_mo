import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, KeyboardAvoidingView } from 'react-native';
import styles from './styles';

class ConfirmOrder extends Component {

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >
                <Text>vkl</Text>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);
