import React, { useState } from "react";

import CenteredSafeArea from "../../components/CenteredSafeArea";
import CustomButton from "../../components/Button";
import CustomRow from "../../components/Row";
import BackButton from "../../components/BackButton";
import { Color } from "../../enum";
import CustomInput from "../../components/InputBox";
import { View } from "react-native";
import InputText from "../../components/InputText";
import { Button } from "react-native-paper";
import BottomButton from "../../components/BottomButton";

const enum EmailLoginField {
  EMAIL = "email",
  PASSWORD = "password",
}

const EmailLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const validateEmail = (email: string) => {
    setEmail(email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setIsEmailValid(false);
      setEmailErrorMessage("이메일은 필수 항목입니다.");
      return;
    }
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      setEmailErrorMessage("유효한 이메일을 입력하세요.");
      return;
    }

    setIsEmailValid(true);
    return;
  };

  const validatePassword = (password: string) => {
    setPassword(password);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,20}$/;

    if (!password) {
      setIsPasswordValid(false);
      setPasswordErrorMessage("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      setPasswordErrorMessage("비밀번호는 8자 이상 20자 이하이고, 알파벳, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    setIsPasswordValid(true);
  };

  const handleInputChange = (field: EmailLoginField, value: string) => {
    if (field === EmailLoginField.EMAIL) {
      setEmail(value);
      validateEmail(value);
      return;
    }

    setPassword(value);
    validatePassword(value);
  };

  return (
    <CenteredSafeArea>
      <BackButton onPress={() => console.log("Back pressed")} label="이메일 로그인" />

      <View style={{ margin: 20, justifyContent: "center" }}>
        <InputText
          label="이메일 *"
          onChangeText={(value) => handleInputChange(EmailLoginField.EMAIL, value)}
          error={!isEmailValid}
          errorMessage={emailErrorMessage}
          value={email}
        ></InputText>
        <InputText
          label="비밀번호 *"
          onChangeText={(value) => handleInputChange(EmailLoginField.PASSWORD, value)}
          error={!isPasswordValid}
          errorMessage={passwordErrorMessage}
          value={password}
          secureTextEntry
        ></InputText>

        <Button mode="text" textColor={Color.DARK_GRAY} onPress={() => console.log("회원가입")}>
          {"회원가입 >"}
        </Button>

        <Button mode="text" textColor={Color.DARK_GRAY} onPress={() => console.log("아이디 / 비밀번호 찾기")}>
          {"아이디 / 비밀번호 찾기 >"}
        </Button>
      </View>

      <BottomButton
        label="로그인"
        onPress={() => console.log(email, password)}
        disabled={!email || !password}
      ></BottomButton>
    </CenteredSafeArea>
  );
};

export default EmailLoginScreen;
