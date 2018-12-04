import React from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../utils/constants';

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const Back = ({ onPress }) => (
  <IconLeftContainer onPress={onPress}>
    <FontAwesome name="angle-left" size={25} color={colors.WHITE} />
  </IconLeftContainer>
);

export default Back;
