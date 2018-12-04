import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { FormattedWrapper } from 'react-native-globalize';
import Navigator from './navigator/index';
import { colors } from './utils/constants';

const styles = StyleSheet.create({
    viewRoot: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
});

class RootContainer extends Component {
    render() {
        return (
            <ThemeProvider theme={colors}>
                <FormattedWrapper>
                    <View style={styles.viewRoot}>
                        <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
                        <Navigator />
                    </View>
                </FormattedWrapper>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
	state,
});

export default  connect(mapStateToProps,null)(RootContainer);
