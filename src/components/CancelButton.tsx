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

const CancelButton: React.FC<BackButtonProps> = (props) => {
  return (
    <HeaderContainer>
      <BackButtonContainer onPress={props.onPress}>
        <Icon name="close" size={30} color={color.BLACK} />
      </BackButtonContainer>
    </HeaderContainer>
  );
};

export default CancelButton;
