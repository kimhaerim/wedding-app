import { useState } from "react";
import { Color, CostType } from "../../enum";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import BackButton from "../../components/BackButton";
import { View } from "react-native";
import InputText from "../../components/InputText";
import DatePicker from "../../components/DatePicker";
import BottomButton from "../../components/BottomButton";
import { SegmentedButtons, Text } from "react-native-paper";

const EditCost = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState<string>("");
  const [costType, setCostType] = useState<CostType>(CostType.BASE);
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  return (
    <CenteredSafeArea>
      <BackButton label={isEdit ? "비용 수정" : "비용 추가"} onPress={() => console.log("뒤로 가기")}></BackButton>

      <View style={{ margin: 20 }}>
        <InputText
          label="비용 *"
          placeholder="ex. 계약금, 드레스 추가금 등"
          value={title}
          onChangeText={setTitle}
          error={title?.length === 0}
          errorMessage="비용에 대한 설명을 입력하세요."
        ></InputText>

        <InputText
          label="총 비용 *"
          value={amount}
          onChangeText={(value) => setAmount(+value)}
          error={typeof amount !== "number"}
          errorMessage="비용은 숫자로 입력해주세요."
        ></InputText>

        <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>결제 형태 *</Text>
        <SegmentedButtons
          value={costType}
          onValueChange={(value) => setCostType(value as CostType)}
          buttons={[
            {
              value: CostType.BASE,
              label: "기본금",
              style: costType === CostType.BASE ? selectedButtonStyle : segmentedButtonStyle,
            },
            {
              value: CostType.ADDITIONAL,
              label: "✚ 추가금",
              style: costType === CostType.ADDITIONAL ? selectedButtonStyle : segmentedButtonStyle,
            },
          ]}
        />

        <View style={{ marginBottom: 50 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 30 }}>결제일</Text>
          <DatePicker value={paymentDate} onChange={setPaymentDate}></DatePicker>
        </View>

        <InputText label="메모" value={memo} onChangeText={setMemo} style={{ height: 150 }}></InputText>
      </View>

      <BottomButton
        label={isEdit ? "수정" : "추가"}
        disabled={title.length === 0}
        onPress={() => console.log("0")}
      ></BottomButton>
    </CenteredSafeArea>
  );
};

export default EditCost;
