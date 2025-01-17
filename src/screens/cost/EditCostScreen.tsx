import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";
import { showErrorToast, showToast } from "../../common/util";
import BottomButton from "../../components/common/BottomButton";
import DatePicker from "../../components/common/DatePicker";
import InputText from "../../components/common/InputText";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { Color, CostType } from "../../enum";
import { MutationAddCost, MutationUpdateCost, QueryGetCOst } from "../../graphql/cost";
import { IAddCost, ICost, IUpdateCost } from "../../interface";
import { EditCostNavigationType, EditCostRouteProp } from "../../navigation/interface";

export const EditCostScreen: React.FC = () => {
  const route = useRoute<EditCostRouteProp>();
  const navigation = useNavigation<EditCostNavigationType>();
  const { costId, checkListId, fromNavigator } = route.params;

  const [getCost] = useLazyQuery<{ cost: ICost }, { id: number }>(QueryGetCOst, {
    fetchPolicy: "no-cache",
    onCompleted: ({ cost }) => setCost(cost),
  });

  useEffect(() => {
    if (!costId) {
      return;
    }

    getCost({ variables: { id: costId } });
  }, [costId]);

  const [addCost] = useMutation<{ addCost: number }, IAddCost>(MutationAddCost);
  const [updateCost, {}] = useMutation<{ updateCost: boolean }, IUpdateCost>(MutationUpdateCost);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: costId ? "비용 수정" : "비용 저장" });
  }, [navigation, costId]);

  const [cost, setCost] = useState<ICost | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState<string | undefined>(undefined);
  const [costType, setCostType] = useState<CostType>(CostType.BASE);
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!cost) {
      return;
    }

    setTitle(cost.title);
    setAmount(cost.amount);
    setMemo(cost.memo);
    setCostType(cost.costType);
    setPaymentDate(cost.paymentDate ? new Date(cost.paymentDate) : undefined);
  }, [cost]);

  const getCostData = useMemo(() => {
    const paymentDateString = dayjs(paymentDate).format("YYYY-MM-DD");
    const data = { title, amount, memo, costType, paymentDate: paymentDateString, checkListId };
    return costId ? { costId, ...data } : data;
  }, [title, amount, memo, costType, paymentDate]);

  const handleAddCost = useCallback(async () => {
    const addVariables = getCostData;
    if (!addVariables.title) {
      showToast("이름은 필수입니다.", "info");
      return;
    }

    try {
      const { data: addResult } = await addCost({ variables: addVariables });
      return addResult?.addCost;
    } catch (err) {
      showErrorToast();
    }
  }, [getCostData]);

  const handleUpdateCost = useCallback(async () => {
    const updateVariables = getCostData;

    if (!costId) {
      showErrorToast();
      return;
    }

    try {
      await updateCost({ variables: { ...updateVariables, id: costId } });
    } catch (err) {
      showErrorToast();
    }
  }, [getCostData]);

  const handleEditCost = useCallback(async () => {
    if (costId) {
      await handleUpdateCost();
      navigation.goBack();
      return;
    }

    const newCostId = await handleAddCost();
    if (!newCostId) {
      showErrorToast();
      return;
    }

    if (checkListId) {
      navigation.goBack();
    }
  }, [getCostData]);

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  return (
    <WhiteSafeAreaView>
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
          value={costType ?? CostType.BASE}
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
          <DatePicker label="날짜" value={paymentDate} onChange={setPaymentDate}></DatePicker>
        </View>

        <InputText
          label="메모"
          value={memo ?? ""}
          onChangeText={setMemo}
          style={{ height: 150 }}
          placeholder="ex. 짝궁 할인 무제한 가능, 본식 후에는 추가 결제 필요 등"
        ></InputText>
      </View>

      <BottomButton
        label={costId ? "수정" : "저장"}
        disabled={title?.length === 0}
        onPress={handleEditCost}
      ></BottomButton>
    </WhiteSafeAreaView>
  );
};
