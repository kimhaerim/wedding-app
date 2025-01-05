import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SegmentedButtons, Text } from "react-native-paper";
import BottomButton from "../../components/common/BottomButton";
import DatePicker from "../../components/common/DatePicker";
import InputText from "../../components/common/InputText";
import TimePicker from "../../components/common/TimePicker";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { CheckListStatus, Color } from "../../enum";
import { ICategory } from "../../interface/category.interface";
import { categoryMockData } from "../../mock/CheckListMockData";
import { CheckListStackParamList } from "../../navigation/interface";

interface EditCheckListScreenProps {
  navigation: StackNavigationProp<CheckListStackParamList, "EditCheckList">;
  route: RouteProp<CheckListStackParamList, "EditCheckList">;
}

export const EditCheckListScreen: React.FC<EditCheckListScreenProps> = ({ navigation, route }) => {
  const { checkListId, isFromCategory } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: checkListId ? "체크리스트 수정" : "체크리스트 저장" });
  }, [navigation, checkListId]);

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

  const renderFormItems = () => {
    return [
      {
        key: "title",
        component: (
          <InputText
            label="체크리스트 이름 *"
            placeholder="ex. 웨딩홀1 투어 예약, 본식 스냅 계약 등"
            value={title || ""}
            onChangeText={setTitle}
            error={title?.length === 0}
            errorMessage="이름을 입력하세요."
          />
        ),
      },
      !isFromCategory && {
        key: "category",
        component: (
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
        ),
      },
      {
        key: "reservedAt",
        component: (
          <>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>예약일</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20 }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <DatePicker label="날짜" value={reservedAt} onChange={(date) => setReservedAt(date)} />
              </View>
              <TimePicker value={reservedTime} onChange={setReservedTime} />
            </View>
          </>
        ),
      },
      {
        key: "memo",
        component: (
          <InputText
            label="메모"
            value={memo || ""}
            onChangeText={setMemo}
            style={{ height: 150 }}
            placeholder="ex. 웨딩홀 투어1 : 보증인원 200명"
          />
        ),
      },
      {
        key: "status",
        component: (
          <>
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
          </>
        ),
      },
    ].filter((item) => item !== false && item !== null && item !== undefined);
  };

  return (
    <WhiteSafeAreaView>
      <FlatList
        data={renderFormItems()}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ margin: 20 }}
      />
      <BottomButton
        label={checkListId ? "수정" : "추가"}
        disabled={!title || title?.length === 0}
        onPress={() => console.log("0")}
      />
    </WhiteSafeAreaView>
  );
};
