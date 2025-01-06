import { useLazyQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { showToast, validateEmail, validatePassword } from "../../common/util";
import BottomButton from "../../components/common/BottomButton";
import Button from "../../components/common/Button";
import InputText from "../../components/common/InputText";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { Color } from "../../enum";
import { QueryExistsUser } from "../../graphql/user";
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

interface SignupProps {
  navigation: StackNavigationProp<RootStackParamList, "Signup">;
  route: RouteProp<RootStackParamList, "Signup">;
}

export const SignupScreen: React.FC<SignupProps> = ({ navigation }) => {
  const [existsUser] = useLazyQuery<{ existsUser: boolean }, { email: string }>(QueryExistsUser);

  const [isExistsUser, setIsExistsUser] = useState<boolean>(true);

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

  const handleEmailCheck = useCallback(() => {
    existsUser({ variables: { email: formData.email } })
      .then(({ data }) => {
        if (!data) {
          showToast("다시 시도해주세요.");
          return;
        }

        const result = data.existsUser;
        if (result) {
          Toast.show({
            type: "info", // 'success', 'error', 'info'
            text1: "알림",
            text2: "이미 가입된 이메일 입니다.",
          });
          console.log(result);
          showToast("이미 가입된 이메일 입니다.", "info");
        }

        if (!result) {
          console.log(result);
          showToast("사용 가능한 이메일입니다.", "success");
        }

        setIsExistsUser(data.existsUser);
      })
      .catch(() => {
        alert("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      });
  }, [existsUser, formData.email]);

  const isFormValid = useMemo(
    () => formValidity.isEmailValid && formValidity.isPasswordValid && formValidity.isPasswordMatching && !isExistsUser,
    [formValidity, isExistsUser]
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
          style={{ marginBottom: 0 }}
        />

        <Button
          onPress={handleEmailCheck}
          style={{ backgroundColor: !formValidity.isEmailValid ? Color.GRAY : Color.BLUE200 }}
        >
          <Text style={{ color: !formValidity.isEmailValid ? Color.DARK_GRAY : Color.BLACK }}>이메일 중복 확인</Text>
        </Button>

        <InputText
          titleStyle={{ marginTop: 20 }}
          label="비밀번호 *"
          onChangeText={(value) => handleInputChange(SignupField.PASSWORD, value)}
          error={!formValidity.isPasswordValid}
          errorMessage={errorMessages.password}
          value={formData.password}
          placeholder="알파벳, 숫자, 특수 문자 조합"
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
