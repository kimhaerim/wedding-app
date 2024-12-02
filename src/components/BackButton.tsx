import React, { Children } from "react";
import { StyleSheet } from "react-native";
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
      <BackButtonContainer onPress={() => console.log("뒤로 가기")}>
        <Icon name="arrow-back" size={30} color={color.BLACK} />
      </BackButtonContainer>
      <CustomText title={props.title} fontSize={15} />
    </HeaderContainer>
  );
};

export default BackButton;
