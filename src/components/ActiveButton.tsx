import React from "react";
import styled from "styled-components/native";
import { Color } from "../enum";

const OuterContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 10;
`;

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  background-color: ${({ disabled }) => (disabled ? "#F2F3F2" : Color.BLACK)};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: ${({ width }) => (width ? width : "90%")};
`;

const ButtonText = styled.Text<ButtonContainerProps>`
  color: ${({ disabled }) => (disabled ? "#D2D2D2" : Color.WHITE)};
  font-weight: bold;
`;

interface ButtonContainerProps {
  width?: string;
  disabled?: boolean;
}

interface ButtonProps extends ButtonContainerProps {
  title: string;
  onPress: () => void;
}

const ActiveButton: React.FC<ButtonProps> = (props) => {
  const { width, title, onPress, disabled } = props;
  return (
    <OuterContainer>
      <ButtonContainer onPress={onPress} width={width} disabled={disabled}>
        <ButtonText disabled={disabled}>{title}</ButtonText>
      </ButtonContainer>
    </OuterContainer>
  );
};

export default ActiveButton;
