import React from "react";
import styled from "styled-components/native";

const OuterContainer = styled.View`
  align-items: center;
`;

const InputBoxContainer = styled.TextInput.attrs(({ placeholder, secureTextEntry }) => ({
  placeholder,
  secureTextEntry,
}))<{ margin?: string }>`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  width: 80%;
  margin: ${({ margin }) => margin || "0px"};
`;

interface InputBoxContainerProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  margin?: string;
  onChangeText: (text: string) => void;
}

const CustomInput: React.FC<InputBoxContainerProps> = (props) => (
  <OuterContainer>
    <InputBoxContainer
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      margin={props.margin}
      secureTextEntry={props.secureTextEntry}
    ></InputBoxContainer>
  </OuterContainer>
);
export default CustomInput;
