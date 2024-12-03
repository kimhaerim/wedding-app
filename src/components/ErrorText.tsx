import React from "react";
import styled from "styled-components/native";

const TextContainer = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  align-self: flex-start;
`;

interface ErrorTextProps {
  message: string;
}

const ErrorText: React.FC<ErrorTextProps> = (props) => <TextContainer>{props.message}</TextContainer>;

export default ErrorText;
