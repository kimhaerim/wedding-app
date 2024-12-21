import React, { useState } from "react";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import BackButton from "../../components/BackButton";
import { Checkbox, Text } from "react-native-paper";
import { View } from "react-native";
import { Color } from "../../enum";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomButton from "../../components/BottomButton";

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
      <BackButton label="이메일 회원가입" onPress={() => {}}></BackButton>

      <View style={{ margin: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}>이용약관에 동의해 주세요.</Text>

        <Checkbox.Item
          label="이용약관 전체 동의"
          status={agreements.isAllAgreed ? "checked" : "unchecked"}
          onPress={handleAllAgreed}
          position="leading"
          color={Color.BLUE}
          uncheckedColor={Color.DARK_GRAY}
          labelStyle={{ textAlign: "left", fontSize: 15 }}
          style={{
            borderRadius: 15,
            backgroundColor: Color.GRAY,
          }}
        />

        <Checkbox.Item
          label="[필수] 만 14세 이상입니다."
          status={agreements.isOver14Agreed ? "checked" : "unchecked"}
          onPress={() => toggleAgreement("isOver14Agreed")}
          position="leading"
          color={Color.BLUE}
          uncheckedColor={Color.DARK_GRAY}
          labelStyle={{ textAlign: "left", fontSize: 13 }}
        />

        <Checkbox.Item
          label="[필수] 이용약관 동의"
          status={agreements.isTermsAgreed ? "checked" : "unchecked"}
          onPress={() => toggleAgreement("isTermsAgreed")}
          position="leading"
          color={Color.BLUE}
          uncheckedColor={Color.DARK_GRAY}
          labelStyle={{ textAlign: "left", fontSize: 13 }}
        />
      </View>

      <BottomButton label="다음" disabled={!agreements.isAllAgreed} onPress={() => {}}></BottomButton>
    </CenteredSafeArea>
  );
};

export default AgreeToTermsScreen;
