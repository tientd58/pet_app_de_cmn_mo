import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper } from 'react-native-globalize';
import { Button } from '../components';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

class SettingsScreen extends Component {
  render() {
    return (
			<FormattedWrapper>
        <ContainerView>
				  <Button text="go to detail" onPress={() => {}} />
        </ContainerView>
			</FormattedWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
	curState:state
});

export default connect(mapStateToProps)(SettingsScreen);
