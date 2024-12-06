import React from "react";
import styled from "styled-components/native";

import ErrorText from "./ErrorText";
import CustomText from "./Text";
import CustomInput from "./InputBox";

const InputGroupContainer = styled.View`
  width: 90%;
  margin-top: 20px;
  padding-left: 10%;
`;

interface InputGroupProps {
  title: string;
  onChangeText: (text: string) => void;
  value: string | number;
  placeholder?: string;
  defaultValue?: string;
  isValid?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
  isNumber?: boolean;
}

const TextInputGroup: React.FC<InputGroupProps> = (props) => {
  const { title, placeholder, value, onChangeText, defaultValue, isValid, errorMessage, secureTextEntry, isNumber } =
    props;
  const isError = !isValid && typeof value === "string" && value.length === 0 && errorMessage;
  return (
    <InputGroupContainer>
      <CustomText title={title} fontSize={16} margin="0px 0px 10px 0px" bold />
      <CustomInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        defaultValue={defaultValue}
        secureTextEntry={secureTextEntry}
        isNumber={isNumber}
      />
      {isError && <ErrorText message={errorMessage}></ErrorText>}
    </InputGroupContainer>
  );
};

export default TextInputGroup;
