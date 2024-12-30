import React, { useState } from "react";
import BackButton from "../../components/common/BackButton";
import { Divider, Text } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import BottomButton from "../../components/common/BottomButton";
import CheckBox from "../../components/common/CheckBox";

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
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton label="이메일 회원가입" onPress={() => {}}></BackButton>

      <View style={{ margin: 20, flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}>이용약관에 동의해 주세요.</Text>

        <CheckBox
          label="이용약관 전체 동의"
          onPress={handleAllAgreed}
          isChecked={agreements.isAllAgreed}
          labelStyle={{ fontWeight: "bold" }}
        ></CheckBox>

        <Divider style={{ margin: 10 }} />
        <View style={{ marginLeft: 10 }}>
          <CheckBox
            label="[필수] 만 14세 이상입니다."
            onPress={() => toggleAgreement("isOver14Agreed")}
            isChecked={agreements.isOver14Agreed}
          ></CheckBox>

          <CheckBox
            label="[필수] 이용약관 동의"
            onPress={() => toggleAgreement("isTermsAgreed")}
            isChecked={agreements.isTermsAgreed}
          ></CheckBox>
        </View>
      </View>
      <BottomButton label="다음" disabled={!agreements.isAllAgreed} onPress={() => {}}></BottomButton>
    </SafeAreaView>
  );
};

export default AgreeToTermsScreen;
