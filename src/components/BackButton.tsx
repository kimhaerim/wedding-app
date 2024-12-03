import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

import CustomText from "./Text";
import { color } from "../enum";

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${color.GRAY};
`;

const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  padding: 5px;
`;

interface BackButtonProps {
  onPress: () => void;
  title: string;
}

const BackButton: React.FC<BackButtonProps> = (props) => {
  return (
    <HeaderContainer>
      <BackButtonContainer onPress={props.onPress}>
        <Icon name="arrow-back" size={30} color={color.BLACK} />
      </BackButtonContainer>
      <CustomText title={props.title} fontSize={15} margin="0px 0px 10px 0px" />
    </HeaderContainer>
  );
};

export default BackButton;
