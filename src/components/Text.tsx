import React from "react";
import styled from "styled-components/native";

const TextWrapper = styled.View<TextContainerProps>`
  margin: ${({ margin }) => margin || "0px"};
`;

const TextContainer = styled.Text<TextContainerProps>`
  padding: ${({ padding }) => padding || "0px"};
  border-radius: 5px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "30px")};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  text-align: ${({ centered }) => (centered ? "center" : "left")};
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
    <TextWrapper margin={margin}>
      <TextContainer fontSize={fontSize} centered={centered} bold={bold} padding={padding}>
        {title}
      </TextContainer>
    </TextWrapper>
  );
};

export default CustomText;
