import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { validateEmail, validatePassword } from "../../common/util";
import BottomButton from "../../components/common/BottomButton";
import InputText from "../../components/common/InputText";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { RootStackParamList } from "../../navigation/interface";

const enum SignupField {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Signup">;
  route: RouteProp<RootStackParamList, "Signup">;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formValidity, setFormValidity] = useState({
    isEmailValid: false,
    isPasswordValid: false,
    isPasswordMatching: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = useCallback(
    (field: SignupField, value: string) => {
      switch (field) {
        case SignupField.EMAIL: {
          const { isValid, errorMessage } = validateEmail(value);
          setFormValidity((prev) => ({ ...prev, isEmailValid: isValid }));
          setErrorMessages((prev) => ({ ...prev, email: errorMessage }));
          break;
        }
        case SignupField.PASSWORD: {
          const { isValid, errorMessage } = validatePassword(value);
          setFormValidity((prev) => ({ ...prev, isPasswordValid: isValid }));
          setErrorMessages((prev) => ({ ...prev, password: errorMessage }));
          break;
        }
        case SignupField.CONFIRM_PASSWORD: {
          const isMatching = formData.password === value;
          setFormValidity((prev) => ({ ...prev, isPasswordMatching: isMatching }));
          setErrorMessages((prev) => ({
            ...prev,
            confirmPassword: isMatching ? "" : "비밀번호와 동일하게 입력해주세요.",
          }));
          break;
        }
      }
    },
    [formData.password]
  );

  const handleInputChange = useCallback(
    (field: SignupField, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      validateField(field, value);
    },
    [validateField]
  );

  const isFormValid = useMemo(
    () => formValidity.isEmailValid && formValidity.isPasswordValid && formValidity.isPasswordMatching,
    [formValidity]
  );

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 20, flex: 1 }}>
        <InputText
          label="이메일 *"
          placeholder="ex. wedding@email.com"
          onChangeText={(value) => handleInputChange(SignupField.EMAIL, value)}
          error={!formValidity.isEmailValid}
          errorMessage={errorMessages.email}
          value={formData.email}
        />
        <InputText
          label="비밀번호 *"
          onChangeText={(value) => handleInputChange(SignupField.PASSWORD, value)}
          error={!formValidity.isPasswordValid}
          errorMessage={errorMessages.password}
          value={formData.password}
          secureTextEntry
        />
        <InputText
          label="비밀번호 확인 *"
          onChangeText={(value) => handleInputChange(SignupField.CONFIRM_PASSWORD, value)}
          error={!formValidity.isPasswordMatching}
          errorMessage={errorMessages.confirmPassword}
          value={formData.confirmPassword}
          secureTextEntry
        />
      </View>

      <BottomButton label="다음" disabled={!isFormValid} onPress={() => navigation.navigate("Profile")} />
    </WhiteSafeAreaView>
  );
};

export default SignupScreen;
