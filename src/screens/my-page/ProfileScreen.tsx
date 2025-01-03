import React, { useState } from "react";
import { SegmentedButtons, Text } from "react-native-paper";
import { Color, Gender } from "../../enum";
import InputText from "../../components/common/InputText";
import BottomButton from "../../components/common/BottomButton";

import TimePicker from "../../components/common/TimePicker";
import DatePicker from "../../components/common/DatePicker";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { View } from "react-native";

const baseDate = new Date(new Date().getFullYear() - 30, 0, 1);
type ProfileNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

const ProfileScreen = ({ navigation }: { navigation: ProfileNavigationProp }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [birthDay, setBirthDay] = useState<Date>(baseDate);
  const [coupleStartDate, setCoupleStartDate] = useState<Date | undefined>(undefined);

  const [weddingDate, setWeddingDate] = useState<Date | undefined>(undefined);
  const [weddingTime, setWeddingTime] = useState<string | undefined>(undefined);

  const changeBirthDay = (date?: Date) => {
    if (date) {
      setBirthDay(date);
    }
    return;
  };

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 20, flex: 1 }}>
        <InputText
          label="이름 *"
          onChangeText={setName}
          error={name === undefined}
          errorMessage={"이름을 입력해주세요."}
          value={name || ""}
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
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 30 }}>생년월일 *</Text>
          <DatePicker value={birthDay} onChange={changeBirthDay}></DatePicker>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 30 }}>처음 만난 날</Text>
          <DatePicker label="날짜" value={coupleStartDate} onChange={setCoupleStartDate}></DatePicker>
        </View>

        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 50 }}>결혼 예정일</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <DatePicker label="날짜" value={weddingDate} onChange={(date) => setWeddingDate(date)} />
          </View>
          <TimePicker value={weddingTime} onChange={setWeddingTime}></TimePicker>
        </View>
      </View>

      <BottomButton
        label="다음"
        disabled={!name || !birthDay}
        onPress={() => navigation.navigate("DefaultCategories")}
      ></BottomButton>
    </WhiteSafeAreaView>
  );
};

export default ProfileScreen;
