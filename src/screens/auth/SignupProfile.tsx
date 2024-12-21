import React, { useState } from "react";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import BackButton from "../../components/BackButton";
import { SegmentedButtons, Text } from "react-native-paper";
import { Color, Gender } from "../../enum";
import { View } from "react-native";
import InputText from "../../components/InputText";
import BottomButton from "../../components/BottomButton";

const SignupProfileScreen = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  return (
    <CenteredSafeArea>
      <BackButton label="이메일 회원가입" onPress={() => {}}></BackButton>

      <View style={{ margin: 20 }}>
        <InputText
          label="이름 *"
          onChangeText={setName}
          error={name === undefined}
          errorMessage={"이름을 입력해주세요."}
          value={name}
        ></InputText>

        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 10 }}>성별 *</Text>
        <SegmentedButtons
          value={gender}
          onValueChange={(value) => setGender(value as Gender)}
          buttons={[
            {
              value: Gender.FEMALE,
              label: "🙍‍♀️ 여성",
              style: gender === Gender.FEMALE ? selectedButtonStyle : segmentedButtonStyle,
            },
            {
              value: Gender.MALE,
              label: "🙍‍♂️ 남성",
              style: gender === Gender.MALE ? selectedButtonStyle : segmentedButtonStyle,
            },
          ]}
        />
      </View>
      <BottomButton label="다음" disabled={!name} onPress={() => {}}></BottomButton>
    </CenteredSafeArea>
  );
};

export default SignupProfileScreen;
