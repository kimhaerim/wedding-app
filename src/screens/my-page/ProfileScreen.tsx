import React, { useCallback, useMemo, useState } from "react";
import { SegmentedButtons, Text } from "react-native-paper";
import BottomButton from "../../components/common/BottomButton";
import InputText from "../../components/common/InputText";
import { Color, Gender } from "../../enum";

import { useMutation } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import { View } from "react-native";
import { setTokens } from "../../common/tokenUtil";
import { combineDateAndTime, showErrorToast, showToast } from "../../common/util";
import DatePicker from "../../components/common/DatePicker";
import TimePicker from "../../components/common/TimePicker";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { useSignup } from "../../context/SignupContext";
import { MutationSignup } from "../../graphql/user";
import { AuthStackParamList } from "../../navigation/interface";

const baseDate = new Date(new Date().getFullYear() - 30, 0, 1);

interface MyPageScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, "Profile">;
  route: RouteProp<AuthStackParamList, "Profile">;
}

export const ProfileScreen: React.FC<MyPageScreenProps> = ({ navigation }) => {
  const { signupData } = useSignup();
  const [signup, { data, error }] = useMutation<{ signup: { accessToken: string; refreshToken: string } }>(
    MutationSignup
  );

  const [name, setName] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [birthday, setBirthday] = useState<Date>(baseDate);
  const [coupleStartDate, setCoupleStartDate] = useState<Date | undefined>(undefined);

  const [weddingDate, setWeddingDate] = useState<Date | undefined>(undefined);
  const [weddingTime, setWeddingTime] = useState<string | undefined>(undefined);

  const changeBirthday = (date?: Date) => {
    if (date) {
      setBirthday(date);
    }
    return;
  };

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  const newSignupData = useMemo(() => {
    return {
      ...signupData,
      name,
      gender,
      birthday: dayjs(birthday).format("YYYY-MM-DD"),
      coupleStartDate: dayjs(coupleStartDate).format("YYYY-MM-DD"),
      weddingDate: combineDateAndTime(weddingDate, weddingTime),
    };
  }, [name, gender, birthday, coupleStartDate, weddingDate, weddingTime]);

  const onSignup = useCallback(async () => {
    try {
      await signup({ variables: newSignupData });

      if (error) {
        showToast(error.message, "error");
        return;
      }
      if (data) {
        setTokens(data.signup.accessToken, data.signup.refreshToken);
        showToast("회원가입이 완료되었습니다!", "success");
      }

      navigation.navigate("DefaultCategories");
    } catch (err) {
      showErrorToast();
    }
  }, [name, gender, birthday, coupleStartDate, newSignupData]);

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
          <DatePicker value={birthday} onChange={changeBirthday}></DatePicker>
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

      <BottomButton label="다음" disabled={!name || !birthday} onPress={onSignup}></BottomButton>
    </WhiteSafeAreaView>
  );
};
