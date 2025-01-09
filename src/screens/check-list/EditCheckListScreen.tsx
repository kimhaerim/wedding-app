import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SegmentedButtons, Text } from "react-native-paper";
import { combineDateAndTime, showErrorToast, showToast } from "../../common/util";
import BottomButton from "../../components/common/BottomButton";
import DatePicker from "../../components/common/DatePicker";
import InputText from "../../components/common/InputText";
import MultilineInputText from "../../components/common/MultilineInputText";
import TimePicker from "../../components/common/TimePicker";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { CheckListStatus, Color } from "../../enum";
import { QueryGetCategories } from "../../graphql/category";
import { MutationAddCheckList, MutationUpdateCheckList, QueryGetCheckList } from "../../graphql/checkList";
import { ICheckList } from "../../interface";
import { ICategory } from "../../interface/category.interface";
import { CheckListStackParamList } from "../../navigation/interface";

interface EditCheckListScreenProps {
  navigation: StackNavigationProp<CheckListStackParamList, "EditCheckList">;
  route: RouteProp<CheckListStackParamList, "EditCheckList">;
}

export const EditCheckListScreen: React.FC<EditCheckListScreenProps> = ({ navigation, route }) => {
  const { checkListId, isFromCategory, categoryId } = route.params;

  const [getCheckList, { error: checkListError }] = useLazyQuery<{ checkList: ICheckList }, { id: number }>(
    QueryGetCheckList
  );
  const [addCheckList, { error }] = useMutation(MutationAddCheckList);
  const [updateCheckList, { error: updateError }] = useMutation(MutationUpdateCheckList);

  const {
    data: categories,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<{ categories: ICategory[] }>(QueryGetCategories);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: checkListId ? "체크리스트 수정" : "체크리스트 저장" });
  }, [navigation, checkListId]);

  const [checkList, setCheckList] = useState<ICheckList | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [memo, setMemo] = useState<string | undefined>(undefined);
  const [checkListStatus, setCheckListStatus] = useState<CheckListStatus>(CheckListStatus.PENDING);
  const [reservedAt, setReservedAt] = useState<Date | undefined>(undefined);
  const [reservedTime, setReservedTime] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (checkList) {
      setDescription(checkList.description);
      setMemo(checkList.memo);
      setReservedAt(checkList.reservedDate ? new Date(checkList.reservedDate) : undefined);
      setReservedTime(
        checkList.reservedDate
          ? new Date(checkList.reservedDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
          : undefined
      );
      setCheckListStatus(checkList.status ?? CheckListStatus.PENDING);
      setSelectedCategoryId(categoryId || null);
    }
  }, [checkList]);

  useEffect(() => {
    if (!checkListId) {
      return;
    }

    const fetchCheckLists = async () => {
      if (checkListError) {
        showToast(checkListError.message, "error");
      }

      const { data } = await getCheckList({ variables: { id: checkListId } });
      if (!data) {
        showErrorToast();
        return;
      }

      setCheckList(data.checkList);
    };

    fetchCheckLists();
  }, [checkListId]);

  const isEdit = useMemo(() => (checkListId ? true : false), [checkListId]);

  const editCheckListData = useMemo(() => {
    const combinedReservedAt = combineDateAndTime(reservedAt, reservedTime);
    const checkListCategoryId = categoryId ? categoryId : selectedCategoryId ? selectedCategoryId : undefined;

    if (isEdit) {
      return {
        ...checkList,
        id: checkListId,
        description,
        categoryId: checkListCategoryId,
        memo,
        status: checkListStatus,
        reservedAt: combinedReservedAt,
      };
    }

    return {
      categoryId: checkListCategoryId,
      description: description,
      memo,
      checkListStatus,
      reservedAt: combinedReservedAt,
    };
  }, [categoryId, description, memo, checkListStatus, reservedAt]);

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  const handleAddCheckList = useCallback(async () => {
    if (!description) {
      showToast("이름은 필수 입니다.", "info");
    }

    try {
      await addCheckList({ variables: editCheckListData });
      if (error) {
        showToast(error.message, "error");
        return;
      }
    } catch (err) {
      showErrorToast();
    }

    navigation.navigate("CheckListsHome");
  }, [editCheckListData]);

  const handleUpdateCheckList = useCallback(async () => {
    if (!description) {
      showToast("이름은 필수 입니다.", "info");
    }

    try {
      await updateCheckList({ variables: editCheckListData });

      if (updateError) {
        showToast(updateError.message, "error");
        return;
      }
    } catch (err) {
      showErrorToast();
    }

    navigation.navigate("CheckListsHome");
  }, [editCheckListData]);

  const renderFormItems = () => {
    return [
      {
        key: "description",
        component: (
          <InputText
            label="체크리스트 이름 *"
            placeholder="ex. 웨딩홀1 투어 예약, 본식 스냅 계약 등"
            value={description || ""}
            onChangeText={setDescription}
            error={description?.length === 0}
            errorMessage="이름을 입력하세요."
          />
        ),
      },
      !isFromCategory &&
        categories &&
        categories.categories.length > 0 && {
          key: "category",
          component: (
            <>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 10 }}>카테고리</Text>
              <DropDownPicker
                style={{ borderColor: Color.DARK_GRAY }}
                open={visible}
                value={selectedCategoryId}
                items={categories?.categories.map((category) => ({ label: category.title, value: category.id }))}
                setOpen={setVisible}
                setValue={setSelectedCategoryId}
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
          <MultilineInputText
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
            <Text style={{ fontSize: 16, marginVertical: 10, fontWeight: "bold" }}>상태</Text>
            <Text style={{ fontSize: 12, marginBottom: 10, color: Color.DARK_GRAY }}>
              확정으로 선택 시 비용이 예산에 반영됩니다.
            </Text>
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
        label={isEdit ? "수정" : "추가"}
        disabled={!description || description?.length === 0}
        onPress={isEdit ? handleUpdateCheckList : handleAddCheckList}
      />
    </WhiteSafeAreaView>
  );
};
