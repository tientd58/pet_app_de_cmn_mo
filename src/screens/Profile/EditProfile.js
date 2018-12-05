import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './styles';

class EditProfile extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>hehe</Text>
            </View>
        );
    }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
