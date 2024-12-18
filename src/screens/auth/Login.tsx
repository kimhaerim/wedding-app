import React from "react";

import CenteredSafeArea from "../../components/CenteredSafeArea";
import CustomButton from "../../components/Button";
import CustomText from "../../components/Text";
import CustomRow from "../../components/Row";
import { Color } from "../../enum";

const LoginScreen = () => {
  return (
    <CenteredSafeArea justifyContent="center">
      <CustomText
        title="웨딩의 시작과 끝을 함께하는 나만의 웨딩 플래너"
        fontSize={18}
        padding="10px 20px"
        centered
      ></CustomText>
      <CustomText
        title="WEDDING"
        fontSize={50}
        margin-="0px 0px 0px 0px"
        padding="10px 20px"
        centered
        bold
      ></CustomText>

      <CustomButton
        title="카카오로 시작하기"
        onPress={() => console.log("카카오로 시작하기")}
        backgroundColor={Color.KAKAO}
        innerTextColor="#191919"
        width="80%"
        innerTextBold
      />
      <CustomButton
        title="@ 이메일로 시작하기"
        onPress={() => console.log("이메일로 시작하기")}
        backgroundColor={Color.WHITE}
        width="80%"
        outlined
        innerTextBold
      />
      <CustomRow>
        <CustomButton
          title="회원가입 >"
          onPress={() => console.log("회원가입")}
          backgroundColor={Color.WHITE}
          innerTextColor={Color.DARK_GRAY}
          fontSize={14}
          innerTextBold
        />
        <CustomButton
          title="아이디 / 비밀번호 찾기 >"
          onPress={() => console.log("아이디 / 비밀번호 찾기")}
          backgroundColor={Color.WHITE}
          innerTextColor={Color.DARK_GRAY}
          fontSize={14}
          innerTextBold
        />
      </CustomRow>
    </CenteredSafeArea>
  );
};

export default LoginScreen;
