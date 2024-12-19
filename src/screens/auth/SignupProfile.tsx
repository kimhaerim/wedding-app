import React, { useState } from "react";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import BackButton from "../../components/BackButton";
import CustomText from "../../components/Text";
import { SegmentedButtons } from "react-native-paper";
import CustomDateTimePicker from "../../components/DateTimePicker";
import ActiveButton from "../../components/ActiveButton";
import TextInputGroup from "../../components/TextInputGroup";
import InputGroup from "../../components/InputGroup";
import { Color, Gender } from "../../enum";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { View } from "react-native";
import HorizontalLine from "../../components/HorizontalLine";

const SignupProfileScreen = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [birthDay, setBirthDay] = useState<Date>(new Date("1990-01-01"));
  const [weddingDate, setWeddingDate] = useState<Date>(new Date());
  const [coupleStartDate, setCoupleStartDate] = useState<Date>(new Date());

  const handleDateChange =
    (setter: React.Dispatch<React.SetStateAction<Date>>) => (_: DateTimePickerEvent, selectedDate?: Date) => {
      setter(selectedDate || new Date());
    };

  const renderDateInput = (
    title: string,
    value: Date,
    mode: "date" | "datetime",
    setter: React.Dispatch<React.SetStateAction<Date>>
  ) => (
    <InputGroup>
      <CustomDateTimePicker title={title} value={value} mode={mode} onChange={handleDateChange(setter)} />
    </InputGroup>
  );

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  return (
    <CenteredSafeArea>
      <BackButton title="이메일 회원가입" onPress={() => console.log("뒤로 가기")} />

      <View style={{ margin: 20 }}>
        <TextInputGroup
          title="이름"
          value={name}
          onChangeText={setName}
          isValid={name === undefined}
          errorMessage="이름을 입력해주세요"
        />

        <InputGroup>
          <CustomText title="성별" fontSize={16} margin="0px 0px 10px 0px" bold />
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
        </InputGroup>

        {renderDateInput("생년월일", birthDay, "date", setBirthDay)}
        {renderDateInput("처음 만난 날", coupleStartDate, "date", setCoupleStartDate)}
        {renderDateInput("결혼 예정일", weddingDate, "datetime", setWeddingDate)}
      </View>

      <ActiveButton
        title="다음"
        width="90%"
        onPress={() => console.log({ name, gender, weddingDate, coupleStartDate })}
        disabled={!name || !weddingDate || !coupleStartDate || !birthDay}
      />
    </CenteredSafeArea>
  );
};

export default SignupProfileScreen;
