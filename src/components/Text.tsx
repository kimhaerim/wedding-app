import React from "react";
import styled from "styled-components/native";
import { Color } from "../enum";

const TextWrapper = styled.View<TextContainerProps>`
  margin: ${({ margin }) => margin || "0px"};
`;

const TextContainer = styled.Text<TextContainerProps>`
  padding: ${({ padding }) => padding || "0px"};
  border-radius: 5px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "30px")};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : "")};
`;

interface TextContainerProps {
  fontSize?: number;
  margin?: string;
  padding?: string;
  centered?: boolean;
  textAlign?: string;
  bold?: boolean;
  backgroundColor?: Color;
}

interface TextProps extends TextContainerProps {
  title: string;
  style?: object;
}

const CustomText: React.FC<TextProps> = (props) => {
  const { title, fontSize, margin, centered, bold, padding, backgroundColor, textAlign, style } = props;

  return (
    <TextWrapper margin={margin}>
      <TextContainer
        fontSize={fontSize}
        centered={centered}
        bold={bold}
        padding={padding}
        textAlign={textAlign}
        backgroundColor={backgroundColor}
        style={style}
      >
        {title}
      </TextContainer>
    </TextWrapper>
  );
};

export default CustomText;
