import React from "react";
import styled from "styled-components/native";

const TextContainer = styled.Text<TextContainerProps>`
  padding: ${({ padding }) => padding || "0px"};
  border-radius: 5px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "30px")};
  font-weight: bold;
  text-align: ${({ centered }) => (centered ? "center" : "left")};
  margin: ${({ margin }) => margin || "0px"};
`;

interface TextContainerProps {
  fontSize?: number;
  margin?: string;
  padding?: string;
  centered?: boolean;
  bold?: boolean;
}

interface TextProps extends TextContainerProps {
  title: string;
}

const CustomText: React.FC<TextProps> = (props) => {
  const { title, fontSize, margin, centered, bold, padding } = props;
  return (
    <TextContainer fontSize={fontSize} margin={margin} centered={centered} bold={bold} padding={padding}>
      {title}
    </TextContainer>
  );
};

export default CustomText;
