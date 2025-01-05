import React, { useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";
import BottomButton from "../../components/common/BottomButton";
import CheckBox from "../../components/common/CheckBox";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { RootStackParamList } from "../../navigation/interface";

const initialAgreements = {
  isAllAgreed: false,
  isOver14Agreed: false,
  isTermsAgreed: false,
};

interface AgreeToTermsProps {
  navigation: StackNavigationProp<RootStackParamList, "AgreeToTerms">;
  route: RouteProp<RootStackParamList, "AgreeToTerms">;
}

export const AgreeToTermsScreen: React.FC<AgreeToTermsProps> = ({ navigation }) => {
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
    <WhiteSafeAreaView>
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
      <BottomButton
        label="다음"
        disabled={!agreements.isAllAgreed}
        onPress={() => navigation.navigate("Signup")}
      ></BottomButton>
    </WhiteSafeAreaView>
  );
};
