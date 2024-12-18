import React from "react";
import styled from "styled-components/native";
import { Color } from "../enum";

const HorizontalLineContainer = styled.View<Props>`
  height: ${({ height }) => (height ? `${height}px` : "1px")};
  background-color: ${({ backgroundColor }) => (backgroundColor ? `${backgroundColor}` : `${Color.GRAY}`)};
  margin: 20px 0px 10px 0px;
`;

interface Props {
  backgroundColor?: Color;
  height?: number;
}

const HorizontalLine: React.FC<Props> = (props) => {
  const { backgroundColor, height } = props;

  return <HorizontalLineContainer height={height} backgroundColor={backgroundColor}></HorizontalLineContainer>;
};
export default HorizontalLine;
