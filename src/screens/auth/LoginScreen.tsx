import React from "react";

import { Color } from "../../enum";
import { Button, Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";

type LoginNavigationProp = StackNavigationProp<RootStackParamList, "Login">;
type LoginRouteProp = RouteProp<RootStackParamList, "Login">;

interface LoginScreenProps {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
  setIsLoggedIn: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, setIsLoggedIn }) => {
  return (
    <WhiteSafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
      <Text variant="titleSmall" style={{ textAlign: "center", marginBottom: 10 }}>
        웨딩의 시작과 끝을 함께하는 나만의 웨딩 플래너
      </Text>
      <Text variant="displayMedium" style={{ fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        WEDDING
      </Text>
      <Button
        mode="contained"
        onPress={() => console.log("카카오로 시작하기")}
        buttonColor={Color.KAKAO}
        textColor="#191919"
        style={{
          width: "80%",
          borderRadius: 12,
          marginBottom: 10,
        }}
        labelStyle={{
          fontWeight: "bold",
        }}
      >
        카카오로 시작하기
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("EmailLogin", { setIsLoggedIn })}
        buttonColor={Color.WHITE}
        textColor="#191919"
        style={{
          width: "80%",
          borderRadius: 12,
          marginBottom: 20,
          borderColor: Color.BLUE200,
          borderWidth: 1,
        }}
      >
        @ 이메일로 시작하기
      </Button>
      <Button mode="text" textColor={Color.DARK_GRAY} onPress={() => navigation.navigate("AgreeToTerms")}>
        {"회원가입 >"}
      </Button>
      <Button mode="text" textColor={Color.DARK_GRAY} onPress={() => console.log("아이디 / 비밀번호 찾기")}>
        {"아이디 / 비밀번호 찾기 >"}
      </Button>
    </WhiteSafeAreaView>
  );
};

export default LoginScreen;
