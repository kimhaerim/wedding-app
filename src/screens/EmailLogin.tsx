import React, { useState } from "react";
import styled from "styled-components/native";
import CenteredSafeArea from "../components/CenteredSafeArea";
import CustomButton from "../components/Button";
import CustomText from "../components/Text";
import Icon from "react-native-vector-icons/Ionicons";
import CustomRow from "../components/Row";
import { Text } from "react-native";
import BackButton from "../components/BackButton";
import { color } from "../enum";
import CustomInput from "../components/InputBox";

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
      ></CustomInput>
      <CustomInput
        placeholder={"비밀번호"}
        margin="15px 0px 20px 0px"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      ></CustomInput>

      <CustomButton
        title="로그인"
        onPress={() => console.log(email, password)}
        backgroundColor={color.BLACK}
        innerTextColor={color.WHITE}
        width="80%"
      ></CustomButton>
      <CustomRow>
        <CustomButton
          title="회원가입 >"
          onPress={() => console.log("회원가입")}
          backgroundColor={color.WHITE}
          innerTextColor={color.DARK_GRAY}
          fontSize={14}
        />
        <CustomButton
          title="아이디 / 비밀번호 찾기 >"
          onPress={() => console.log("아이디 / 비밀번호 찾기")}
          backgroundColor={color.WHITE}
          innerTextColor={color.DARK_GRAY}
          fontSize={14}
        />
      </CustomRow>
    </CenteredSafeArea>
  );
};

export default EmailLoginScreen;
