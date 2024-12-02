import React, { useState } from "react";
import styled from "styled-components/native";
import CenteredSafeArea from "../components/CenteredSafeArea";
import CustomText from "../components/Text";
import CustomInput from "../components/InputBox";
import BackButton from "../components/BackButton";

const InputGroup = styled.View`
  width: 90%;
  margin-top: 20px;
  padding-left: 10%;
`;

const StyledText = styled.Text<{ fontSize?: number; margin?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "16px")};
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
`;

const StyledTextInput = styled.TextInput<{ margin?: string }>`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin: ${({ margin }) => margin || "0px"};
`;

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <CenteredSafeArea>
      <BackButton title="이메일 회원가입" onPress={() => console.log("뒤로 가기")} />

      <InputGroup>
        <StyledText>이메일</StyledText>
        <CustomInput width="100%" placeholder="wedding@email.com" onChangeText={(text) => setEmail(text)} />
      </InputGroup>

      <InputGroup>
        <StyledText>비밀번호 입력</StyledText>
        <CustomInput
          width="100%"
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </InputGroup>

      <InputGroup>
        <StyledText>비밀번호 입력</StyledText>
        <CustomInput
          width="100%"
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </InputGroup>
    </CenteredSafeArea>
  );
};

export default SignupScreen;
