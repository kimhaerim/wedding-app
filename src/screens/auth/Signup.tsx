import React, { useMemo, useState } from "react";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import BackButton from "../../components/BackButton";
import ActiveButton from "../../components/ActiveButton";
import TextInputGroup from "../../components/TextInputGroup";
import { View } from "react-native";

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
    isPasswordMatching: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === SignupField.EMAIL) {
      setFormValidity((prev) => ({ ...prev, isEmailValid: value.includes("@") }));
    } else if (field === SignupField.CONFIRM_PASSWORD || field === SignupField.PASSWORD) {
      setFormValidity((prev) => ({
        ...prev,
        isPasswordMatching: formData.password === value || formData.confirmPassword === value,
      }));
    }
  };

  const isFormValid = useMemo(() => {
    return formValidity.isEmailValid && formData.password.length >= 6 && formValidity.isPasswordMatching;
  }, [formValidity, formData]);

  return (
    <CenteredSafeArea>
      <BackButton title="이메일 회원가입" onPress={() => console.log("뒤로 가기")} />

      <View style={{ margin: 20 }}>
        <TextInputGroup
          title="이메일"
          placeholder="wedding@email.com"
          value={formData.email}
          onChangeText={(value) => handleInputChange(SignupField.EMAIL, value)}
          isValid={formValidity.isEmailValid}
          errorMessage="유효한 이메일을 입력하세요."
        />

        <TextInputGroup
          title="비밀번호 입력"
          placeholder="비밀번호"
          value={formData.password}
          onChangeText={(value) => handleInputChange(SignupField.PASSWORD, value)}
          secureTextEntry
        />

        <TextInputGroup
          title="비밀번호 확인"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange(SignupField.CONFIRM_PASSWORD, value)}
          isValid={formValidity.isPasswordMatching}
          errorMessage="비밀번호와 동일하게 입력해주세요."
          secureTextEntry
        />
      </View>

      <ActiveButton title="다음" width="90%" onPress={() => console.log(formData)} disabled={!isFormValid} />
    </CenteredSafeArea>
  );
};

export default SignupScreen;
