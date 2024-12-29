import { useState } from "react";
import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import { CheckListStatus, Color } from "../../enum";
import InputText from "../../components/InputText";
import DatePicker from "../../components/DatePicker";
import BottomButton from "../../components/BottomButton";
import TimePicker from "../../components/TimePicker";

const EditCheckList = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [checkListStatus, setCheckListStatus] = useState<CheckListStatus>(CheckListStatus.PENDING);
  const [reservedAt, setReservedAt] = useState<Date | undefined>(undefined);
  const [reservedTime, setReservedTime] = useState<string | undefined>(undefined);

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  return (
    <CenteredSafeArea>
      <BackButton
        label={isEdit ? "체크리스트 수정" : "체크리스트 추가"}
        onPress={() => console.log("뒤로 가기")}
      ></BackButton>

      <View style={{ margin: 20 }}>
        <InputText
          label="체크리스트 이름 *"
          placeholder="ex. 웨딩홀, 본식DVD 등"
          value={title}
          onChangeText={setTitle}
          error={title?.length === 0}
          errorMessage="이름을 입력하세요."
        ></InputText>

        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>예약일</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <DatePicker label="날짜" value={reservedAt} onChange={(date) => setReservedAt(date)} />
          </View>
          <TimePicker value={reservedTime} onChange={setReservedTime}></TimePicker>
        </View>

        <InputText label="메모" value={memo} onChangeText={setMemo} style={{ height: 150 }}></InputText>

        <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>상태</Text>
        <SegmentedButtons
          value={checkListStatus}
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

      <BottomButton
        label={isEdit ? "수정" : "추가"}
        disabled={title?.length === 0}
        onPress={() => console.log("0")}
      ></BottomButton>
    </CenteredSafeArea>
  );
};

export default EditCheckList;
