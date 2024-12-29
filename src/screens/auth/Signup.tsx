import React, { useMemo, useState } from "react";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import BackButton from "../../components/BackButton";
import { View } from "react-native";
import BottomButton from "../../components/BottomButton";
import InputText from "../../components/InputText";

const enum SignupField {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formValidity, setFormValidity] = useState({
    isEmailValid: false,
    isPasswordValid: false,
    isPasswordMatching: false,
  });

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setFormValidity((prev) => ({ ...prev, isEmailValid: false }));
      setEmailErrorMessage("이메일은 필수 항목입니다.");
    } else if (!emailRegex.test(email)) {
      setFormValidity((prev) => ({ ...prev, isEmailValid: false }));
      setEmailErrorMessage("유효한 이메일을 입력하세요.");
    } else {
      setFormValidity((prev) => ({ ...prev, isEmailValid: true }));
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,20}$/;

    if (!password) {
      setFormValidity((prev) => ({ ...prev, isPasswordValid: false }));
      setPasswordErrorMessage("비밀번호를 입력해주세요.");
    } else if (!passwordRegex.test(password)) {
      setFormValidity((prev) => ({ ...prev, isPasswordValid: false }));
      setPasswordErrorMessage("비밀번호는 8자 이상 20자 이하이고, 알파벳, 숫자, 특수문자를 포함해야 합니다.");
    } else {
      setFormValidity((prev) => ({ ...prev, isPasswordValid: true }));
    }
  };

  const handleInputChange = (field: SignupField, value: string) => {
    setFormData({ ...formData, [field]: value });

    if (field === SignupField.EMAIL) {
      validateEmail(value);
    }

    if (field === SignupField.PASSWORD) {
      validatePassword(value);
    }

    if (field === SignupField.CONFIRM_PASSWORD) {
      const isPasswordMatching = formData.password === value;
      setFormValidity((prev) => ({ ...prev, isPasswordMatching }));
    }
  };

  const isFormValid = useMemo(() => {
    return formValidity.isEmailValid && formValidity.isPasswordValid && formValidity.isPasswordMatching;
  }, [formValidity]);

  return (
    <CenteredSafeArea>
      <BackButton label="이메일 회원가입" onPress={() => {}}></BackButton>

      <View style={{ margin: 20 }}>
        <InputText
          label="이메일 *"
          placeholder="ex. wedding@email.com"
          onChangeText={(value) => handleInputChange(SignupField.EMAIL, value)}
          error={!formValidity.isEmailValid}
          errorMessage={emailErrorMessage}
          value={formData.email}
        ></InputText>
        <InputText
          label="비밀번호 *"
          onChangeText={(value) => handleInputChange(SignupField.PASSWORD, value)}
          error={!formValidity.isPasswordValid}
          errorMessage={passwordErrorMessage}
          value={formData.password}
          secureTextEntry
        ></InputText>
        <InputText
          label="비밀번호 확인 *"
          onChangeText={(value) => handleInputChange(SignupField.CONFIRM_PASSWORD, value)}
          error={!formValidity.isPasswordMatching}
          errorMessage="비밀번호와 동일하게 입력해주세요."
          value={formData.confirmPassword}
          secureTextEntry
        ></InputText>
      </View>

      <BottomButton label="다음" disabled={!isFormValid} onPress={() => {}}></BottomButton>
    </CenteredSafeArea>
  );
};

export default SignupScreen;
