import React from "react";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import CustomText from "../../components/Text";

import CustomButton from "../../components/Button";
import { Color } from "../../enum";
import { View } from "react-native";
import CancelButton from "../../components/CancelButton";

const ConfirmSignupScreen = () => {
  return (
    <CenteredSafeArea>
      <CancelButton title="이메일 회원가입" onPress={() => console.log("나가기")}></CancelButton>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <CustomText
          title="회원가입을 축하합니다 🎉"
          fontSize={25}
          padding="10px 20px"
          margin="10px 0px 0px 0px"
          centered
          bold
        ></CustomText>
        <CustomText
          title="지금 바로 예신 / 예랑을 초대해서 OOOO을 함께 해보세요!"
          fontSize={16}
          padding="10px 20px"
          margin="10px 0px 20px 0px"
          centered
        ></CustomText>

        <CustomButton
          title="카카오로 초대하기"
          onPress={() => console.log("카카오로 초대하기")}
          backgroundColor={Color.KAKAO}
          innerTextColor="#191919"
          width="80%"
          innerTextBold
        />
        <CustomButton
          title="초대 링크 복사"
          onPress={() => console.log("초대 링크 복사")}
          backgroundColor={Color.WHITE}
          width="80%"
          innerTextBold
          outlined
        />
      </View>
    </CenteredSafeArea>
  );
};

export default ConfirmSignupScreen;
