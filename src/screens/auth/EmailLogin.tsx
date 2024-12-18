import React, { useState } from "react";

import CenteredSafeArea from "../../components/CenteredSafeArea";
import CustomButton from "../../components/Button";
import CustomRow from "../../components/Row";
import BackButton from "../../components/BackButton";
import { Color } from "../../enum";
import CustomInput from "../../components/InputBox";

const EmailLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <CenteredSafeArea>
      <BackButton onPress={() => console.log("Back pressed")} title="이메일 로그인" />
      <CustomInput
        placeholder={"이메일"}
        margin="20px 0px 0px 0px"
        onChangeText={(text) => setEmail(text)}
        width="80%"
      ></CustomInput>
      <CustomInput
        placeholder={"비밀번호"}
        margin="15px 0px 20px 0px"
        onChangeText={(text) => setPassword(text)}
        width="80%"
        secureTextEntry={true}
      ></CustomInput>

      <CustomButton
        title="로그인"
        onPress={() => console.log(email, password)}
        backgroundColor={Color.BLACK}
        innerTextColor={Color.WHITE}
        width="80%"
      ></CustomButton>
      <CustomRow>
        <CustomButton
          title="회원가입 >"
          onPress={() => console.log("회원가입")}
          backgroundColor={Color.WHITE}
          innerTextColor={Color.DARK_GRAY}
          fontSize={14}
        />
        <CustomButton
          title="아이디 / 비밀번호 찾기 >"
          onPress={() => console.log("아이디 / 비밀번호 찾기")}
          backgroundColor={Color.WHITE}
          innerTextColor={Color.DARK_GRAY}
          fontSize={14}
        />
      </CustomRow>
    </CenteredSafeArea>
  );
};

export default EmailLoginScreen;
