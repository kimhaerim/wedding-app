import React from "react";
import styled from "styled-components/native";

const InputGroupContainer = styled.View`
  width: 90%;
  margin-top: 20px;
  padding-left: 10%;
`;

interface InputGroupProps {
  children: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ children }) => {
  return <InputGroupContainer>{React.Children.map(children, (child) => child)}</InputGroupContainer>;
};

export default InputGroup;
