import React from "react";
import CenteredSafeArea from "../../components/CenteredSafeArea";

import { Color } from "../../enum";
import { View } from "react-native";
import CancelButton from "../../components/CancelButton";
import { Button, Text } from "react-native-paper";

const ConfirmSignupScreen = () => {
  return (
    <CenteredSafeArea>
      <CancelButton onPress={() => console.log("나가기")}></CancelButton>

      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>회원가입을 축하합니다 🎉</Text>
        <Text style={{ fontSize: 16, textAlign: "center", marginTop: 20 }}>
          지금 바로 예신 / 예랑을 초대해서 OOOO을 함께 해보세요!
        </Text>

        <Button
          mode="contained"
          onPress={() => console.log("카카오로 초대하기")}
          buttonColor={Color.KAKAO}
          textColor="#191919"
          style={{
            width: "80%",
            borderRadius: 12,
            marginBottom: 10,
            marginTop: 20,
          }}
          labelStyle={{
            fontWeight: "bold",
          }}
        >
          카카오로 초대하기
        </Button>

        <Button
          mode="contained"
          onPress={() => console.log("초대 링크 복사")}
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
          초대 링크 복사
        </Button>
      </View>
    </CenteredSafeArea>
  );
};

export default ConfirmSignupScreen;
