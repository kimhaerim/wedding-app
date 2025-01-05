import React, { useCallback, useMemo, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { validateEmail, validatePassword } from "../../common/util";
import BottomButton from "../../components/common/BottomButton";
import InputText from "../../components/common/InputText";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { Color } from "../../enum";
import { RootStackParamList } from "../../navigation/interface";

const enum EmailLoginField {
  EMAIL = "email",
  PASSWORD = "password",
}

type EmailLoginScreenProps = {
  route: RouteProp<RootStackParamList, "EmailLogin">;
  navigation: StackNavigationProp<RootStackParamList, "EmailLogin">;
};

export const EmailLoginScreen = ({ route }: EmailLoginScreenProps) => {
  const { setIsLoggedIn } = route.params;
  const [email, setEmail] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const isButtonDisabled = useMemo(() => {
    return !(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  const handleInputChange = useCallback((field: EmailLoginField, value: string) => {
    if (field === EmailLoginField.EMAIL) {
      const { isValid, errorMessage } = validateEmail(value);
      setIsEmailValid(isValid);
      setEmail(value);
      setEmailErrorMessage(errorMessage);
    } else if (field === EmailLoginField.PASSWORD) {
      const { isValid, errorMessage } = validatePassword(value);
      setIsPasswordValid(isValid);
      setPassword(value);
      setPasswordErrorMessage(errorMessage);
    }
  }, []);

  const handleLogin = useCallback(() => {
    if (isEmailValid && isPasswordValid) {
      setIsLoggedIn(true);
    }
  }, [isEmailValid, isPasswordValid, setIsLoggedIn]);

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 20, justifyContent: "center" }}>
        <InputText
          label="이메일 *"
          onChangeText={(value) => handleInputChange(EmailLoginField.EMAIL, value)}
          error={!!emailErrorMessage}
          errorMessage={emailErrorMessage}
          placeholder="wedding@gmail.com"
          value={email}
        />
        <InputText
          label="비밀번호 *"
          onChangeText={(value) => handleInputChange(EmailLoginField.PASSWORD, value)}
          error={!!passwordErrorMessage}
          errorMessage={passwordErrorMessage}
          value={password}
          secureTextEntry
        />

        <Button mode="text" textColor={Color.DARK_GRAY} onPress={() => console.log("회원가입")}>
          회원가입 &gt;
        </Button>
        <Button mode="text" textColor={Color.DARK_GRAY} onPress={() => console.log("아이디 / 비밀번호 찾기")}>
          아이디 / 비밀번호 찾기 &gt;
        </Button>
      </View>

      <BottomButton label="로그인" onPress={handleLogin} disabled={isButtonDisabled} />
    </WhiteSafeAreaView>
  );
};
