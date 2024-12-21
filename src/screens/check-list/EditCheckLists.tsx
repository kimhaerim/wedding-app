import { useState } from "react";
import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import CustomText from "../../components/Text";
import ActiveButton from "../../components/BottomButton";
import { View } from "react-native";
import TextInputGroup from "../../components/InputText";
import CustomDateTimePicker from "../../components/DateTimePicker";
import { Button, Divider, Menu, SegmentedButtons } from "react-native-paper";
import { CheckListStatus, Color } from "../../enum";

const EditCheckLists = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [checkListStatus, setCheckListStatus] = useState<CheckListStatus>(CheckListStatus.PENDING);

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  return (
    <CenteredSafeArea>
      <BackButton
        title={isEdit ? "체크리스트 수정" : "체크리스트 추가"}
        onPress={() => console.log("뒤로 가기")}
      ></BackButton>

      <View style={{ margin: 20 }}>
        <TextInputGroup
          title={"체크리스트 이름 *"}
          placeholder="ex. 웨딩홀, 본식DVD 등"
          value={""}
          defaultValue={undefined}
          onChangeText={() => console.log("")}
          errorMessage="이름을 입력하세요."
        />
        <CustomDateTimePicker title={"예약일"} onChange={() => console.log("")} value={new Date()} mode="datetime" />
        <TextInputGroup title={"메모"} value={""} onChangeText={() => console.log("")} />
        <CustomText title={"상태"} fontSize={16} margin="10px 0px 10px 0px" bold></CustomText>
        <SegmentedButtons
          value={CheckListStatus.CONFIRMED}
          onValueChange={(value) => setCheckListStatus(value as CheckListStatus)}
          buttons={[
            {
              value: CheckListStatus.CONFIRMED,
              label: "✔️ 확정",
              style: checkListStatus === CheckListStatus.CONFIRMED ? selectedButtonStyle : segmentedButtonStyle,
            },
            {
              value: CheckListStatus.PENDING,
              label: "보류",
              style: checkListStatus === CheckListStatus.PENDING ? selectedButtonStyle : segmentedButtonStyle,
            },
            {
              value: CheckListStatus.REJECTED,
              label: "❌ 탈락",
              style: checkListStatus === CheckListStatus.REJECTED ? selectedButtonStyle : segmentedButtonStyle,
            },
          ]}
        />
      </View>

      <ActiveButton
        title={isEdit ? "수정" : "추가"}
        // disabled={inputTitle.length === 0}
        onPress={() => console.log("0")}
      ></ActiveButton>
    </CenteredSafeArea>
  );
};

export default EditCheckLists;
