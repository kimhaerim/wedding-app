import React, { useState } from "react";

import { Color } from "../../enum";
import { View } from "react-native";
import InputText from "../../components/common/InputText";
import { Button } from "react-native-paper";
import BottomButton from "../../components/common/BottomButton";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { RouteProp } from "@react-navigation/native";

const enum EmailLoginField {
  EMAIL = "email",
  PASSWORD = "password",
}

type EmailLoginScreenProps = {
  route: RouteProp<RootStackParamList, "EmailLogin">;
  navigation: StackNavigationProp<RootStackParamList, "EmailLogin">;
};

const EmailLoginScreen = ({ route }: EmailLoginScreenProps) => {
  const { setIsLoggedIn } = route.params;
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

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
    <WhiteSafeAreaView>
      <View style={{ margin: 20, justifyContent: "center" }}>
        <InputText
          label="이메일 *"
          onChangeText={(value) => handleInputChange(EmailLoginField.EMAIL, value)}
          error={!isEmailValid}
          errorMessage={emailErrorMessage}
          placeholder="wedding@gmail.com"
          value={email || ""}
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
      <BottomButton label="로그인" onPress={handleLogin} disabled={!email || !password}></BottomButton>
    </WhiteSafeAreaView>
  );
};

export default EmailLoginScreen;
