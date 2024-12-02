import React from "react";
import styled from "styled-components/native";
import { color } from "../enum";

const HorizontalLineContainer = styled.View`
  height: 1px;
  background-color: ${color.GRAY};
  margin: 0px 15px 0px 15px;
`;

const HorizontalLine: React.FC = () => <HorizontalLineContainer></HorizontalLineContainer>;
export default HorizontalLine;
