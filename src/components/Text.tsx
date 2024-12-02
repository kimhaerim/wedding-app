import React from "react";
import styled from "styled-components/native";

const TextContainer = styled.Text<TextContainerProps>`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "30px")};
  font-weight: bold;
  text-align: ${({ centered }) => (centered ? "center" : "left")};
  margin: ${({ margin }) => margin || "0px"};
`;

interface TextContainerProps {
  fontSize?: number;
  margin?: string;
  centered?: boolean;
  bold?: boolean;
}

interface TextProps extends TextContainerProps {
  title: string;
}

const CustomText: React.FC<TextProps> = (props) => {
  const { title, fontSize, margin, centered, bold } = props;
  console.log(margin);
  return (
    <TextContainer fontSize={fontSize} margin={margin} centered={centered} bold={bold}>
      {title}
    </TextContainer>
  );
};

export default CustomText;
