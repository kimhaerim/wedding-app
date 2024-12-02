import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const TextContainer = styled.Text<TextContainerProps>`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "30px")};
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  text-align: ${(centered) => (centered ? "center" : "left")};
`;

interface TextContainerProps {
  fontSize?: number;
  marginBottom?: number;
  centered?: boolean;
  bold?: boolean;
}

interface TextProps extends TextContainerProps {
  title: string;
}

const CustomText: React.FC<TextProps> = (props) => {
  const { title, fontSize, marginBottom, centered, bold } = props;
  return (
    <TextContainer fontSize={fontSize} marginBottom={marginBottom} centered={centered} bold={bold}>
      {title}
    </TextContainer>
  );
};

export default CustomText;
