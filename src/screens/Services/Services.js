import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class ServiceByCategory extends Component {

    render() {
        return (
            <View>
                <Text>Hiện chưa có dịch vụ nào</Text>
            </View>
        );
    }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceByCategory);
