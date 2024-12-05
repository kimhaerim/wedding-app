import React from "react";
import styled from "styled-components/native";

const OuterContainer = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: ${({ width }) => (width ? width : "100%")};
  border: ${({ outlined }) => (outlined ? "1px solid gray" : "none")};
`;

const ButtonText = styled.Text<ButtonInnerTextProps>`
  color: ${({ innerTextColor }) => innerTextColor || "black"};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "16px")};
  font-weight: ${({ innerTextBold }) => (innerTextBold ? "bold" : "normal")};
`;

interface ButtonContainerProps {
  backgroundColor: string;
  outlined?: boolean;
  width?: string;
}

interface ButtonInnerTextProps {
  innerTextColor?: string;
  fontSize?: number;
  innerTextBold?: boolean;
}

interface ButtonProps extends ButtonContainerProps, ButtonInnerTextProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<ButtonProps> = (props) => {
  const { backgroundColor, outlined, width, innerTextColor, fontSize, title, onPress, innerTextBold } = props;
  return (
    <OuterContainer>
      <ButtonContainer onPress={onPress} backgroundColor={backgroundColor} width={width} outlined={outlined}>
        <ButtonText innerTextColor={innerTextColor} fontSize={fontSize} innerTextBold={innerTextBold}>
          {title}
        </ButtonText>
      </ButtonContainer>
    </OuterContainer>
  );
};
export default CustomButton;
