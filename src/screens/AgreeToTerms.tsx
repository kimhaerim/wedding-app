import React, { useState } from "react";
import styled from "styled-components/native";
import CenteredSafeArea from "../components/CenteredSafeArea";
import CustomText from "../components/Text";

import HorizontalLine from "../components/HorizontalLine";
import CustomButton from "../components/Button";
import { color } from "../enum";
import ActiveButton from "../components/ActiveButton";
import BackButton from "../components/BackButton";
import CheckBox from "../components/CheckBox";

const initialAgreements = {
  isAllAgreed: false,
  isOver14Agreed: false,
  isTermsAgreed: false,
};

const AgreeToTermsScreen = () => {
  const [agreements, setAgreements] = useState(initialAgreements);

  const toggleAgreement = (agreement: keyof typeof initialAgreements) => {
    setAgreements((prevState) => {
      const newState = {
        ...prevState,
        [agreement]: !prevState[agreement],
      };

      if (newState.isTermsAgreed && newState.isOver14Agreed) {
        newState.isAllAgreed = true;
      } else if (newState.isTermsAgreed || newState.isOver14Agreed) {
        newState.isAllAgreed = false;
      }

      return { ...newState };
    });
  };

  const handleAllAgreed = () => {
    setAgreements((prevState) => {
      const newValue = !prevState.isAllAgreed;
      const newState = {
        isAllAgreed: newValue,
        isOver14Agreed: newValue,
        isTermsAgreed: newValue,
      };

      return newState;
    });
  };

  return (
    <CenteredSafeArea>
      <BackButton title="이메일 회원가입" onPress={() => console.log("뒤로 가기")}></BackButton>
      <CustomText title="이용약관에 동의해 주세요." fontSize={20} margin="30px 0px 0px 0px" padding="10px 20px" />

      <CheckBox
        onValueChange={handleAllAgreed}
        margin="30px 10px 10px 0px"
        title="이용약관 전체 동의"
        value={agreements.isAllAgreed}
      />
      <HorizontalLine />

      <CheckBox
        onValueChange={() => toggleAgreement("isOver14Agreed")}
        margin="10px 10px 0px 0px"
        title="[필수] 만 14세 이상입니다."
        value={agreements.isOver14Agreed}
      />
      <CheckBox
        onValueChange={() => toggleAgreement("isTermsAgreed")}
        margin="10px 10px 0px 0px"
        title="[필수] 이용약관 동의"
        value={agreements.isTermsAgreed}
      />
      <ActiveButton
        title="다음"
        width="90%"
        onPress={() => console.log("다음")}
        disabled={!agreements.isAllAgreed}
      ></ActiveButton>
    </CenteredSafeArea>
  );
};

export default AgreeToTermsScreen;
