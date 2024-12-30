import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import { SafeAreaView, View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import { CheckListStatus, Color } from "../../enum";
import InputText from "../../components/common/InputText";
import DatePicker from "../../components/common/DatePicker";
import BottomButton from "../../components/common/BottomButton";
import TimePicker from "../../components/common/TimePicker";
import { ICategory } from "../../interface/category.interface";
import { categoryMockData } from "../../mock/CheckListMockData";
import DropDownPicker from "react-native-dropdown-picker";

// Route 설정
const EditCheckList = () => {
  const isFromCategory = false;
  const [checkListId, setCheckListId] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>(categoryMockData);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [memo, setMemo] = useState<string | undefined>(undefined);
  const [checkListStatus, setCheckListStatus] = useState<CheckListStatus>(CheckListStatus.PENDING);
  const [reservedAt, setReservedAt] = useState<Date | undefined>(undefined);
  const [reservedTime, setReservedTime] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton
        label={checkListId ? "체크리스트 수정" : "체크리스트 추가"}
        onPress={() => console.log("뒤로 가기")}
      ></BackButton>

      <View style={{ margin: 20 }}>
        <InputText
          label="체크리스트 이름 *"
          placeholder="ex. 웨딩홀, 본식DVD 등"
          value={title || ""}
          onChangeText={setTitle}
          error={title?.length === 0}
          errorMessage="이름을 입력하세요."
        ></InputText>

        {isFromCategory ? null : (
          <>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 10 }}>카테고리</Text>

            <DropDownPicker
              style={{ borderColor: Color.DARK_GRAY }}
              open={visible}
              value={categoryId}
              items={categories.map((category) => ({ label: category.title, value: category.id }))}
              setOpen={setVisible}
              setValue={setCategoryId}
              placeholder="카테고리 선택"
              placeholderStyle={{ color: Color.DARK_GRAY, fontSize: 13 }}
            />
          </>
        )}

        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>예약일</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <DatePicker label="날짜" value={reservedAt} onChange={(date) => setReservedAt(date)} />
          </View>
          <TimePicker value={reservedTime} onChange={setReservedTime}></TimePicker>
        </View>

        <InputText
          label="메모"
          value={memo || ""}
          onChangeText={setMemo}
          style={{ height: 150 }}
          placeholder="ex. 웨딩홀 투어1. 보증인원 200명"
        ></InputText>

        <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>상태</Text>
        <SegmentedButtons
          value={checkListStatus}
          onValueChange={(value) => setCheckListStatus(value as CheckListStatus)}
          style={{ borderColor: Color.DARK_GRAY }}
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
        label={checkListId ? "수정" : "추가"}
        disabled={!title || title?.length === 0}
        onPress={() => console.log("0")}
      ></BottomButton>
    </SafeAreaView>
  );
};

export default EditCheckList;
