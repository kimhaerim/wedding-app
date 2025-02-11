import { useLazyQuery, useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Text } from "react-native-paper";
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
import { useApiMutation } from "../../hooks/useGql";
import { IAddCheckList, ICheckList, IUpdateCheckList } from "../../interface";
import { ICategory } from "../../interface/category.interface";
import { EditCheckListNavigationType, EditCheckListRouteProp } from "../../navigation/interface";

export const EditCheckListScreen: React.FC = () => {
  const route = useRoute<EditCheckListRouteProp>();
  const navigation = useNavigation<EditCheckListNavigationType>();

  const { checkListId, isFromCategory, categoryId, fromNavigator } = route.params;
  let reservedDate: string | undefined = undefined;
  if ("reservedAt" in route.params) {
    reservedDate = route.params.reservedAt;
  }

  const { data: categories } = useQuery<{ categories: ICategory[] }>(QueryGetCategories, {
    variables: { offset: 0, limit: 10 },
  });

  const [getCheckList, { loading }] = useLazyQuery<{ checkList: ICheckList }, { id: number }>(QueryGetCheckList, {
    fetchPolicy: "no-cache",
    onCompleted: ({ checkList }) => setCheckList(checkList),
  });

  const { mutate: addCheckList } = useApiMutation<{ addCheckList: number }, IAddCheckList>(MutationAddCheckList);
  const { mutate: updateCheckList } = useApiMutation<{ updateCheckList: boolean }, IUpdateCheckList>(
    MutationUpdateCheckList
  );

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: checkListId ? "체크리스트 수정" : "체크리스트 저장" });
  }, [navigation, checkListId]);

  const [checkList, setCheckList] = useState<ICheckList | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
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

    getCheckList({ variables: { id: checkListId } });
  }, [checkListId]);

  const isEdit = useMemo(() => (checkListId ? true : false), [checkListId]);

  const getCheckListData = useMemo(() => {
    const combinedReservedAt = reservedDate
      ? combineDateAndTime(new Date(reservedDate), "00:00")
      : combineDateAndTime(reservedAt, reservedTime);

    const checkListCategoryId = categoryId ? categoryId : selectedCategoryId ? selectedCategoryId : undefined;
    return {
      description,
      categoryId: checkListCategoryId,
      memo,
      status: checkListStatus,
      reservedDate: combinedReservedAt,
    };
  }, [categoryId, description, memo, checkListStatus, reservedAt, reservedTime]);

  const segmentedButtonStyle = {
    backgroundColor: Color.WHITE,
  };

  const selectedButtonStyle = {
    backgroundColor: Color.BLUE100,
  };

  const handleAddCheckList = useCallback(async () => {
    const addVariables = getCheckListData;
    if (!addVariables.description) {
      showToast("이름은 필수입니다.", "info");
      return;
    }

    try {
      const { data: addResult } = await addCheckList({ variables: addVariables });
      return addResult?.addCheckList;
    } catch {
      showErrorToast();
    }
  }, [getCheckListData]);

  const handleUpdateCheckList = useCallback(async () => {
    if (!checkListId) {
      showErrorToast();
      return;
    }

    try {
      await updateCheckList({ variables: { ...getCheckListData, id: checkListId } });
    } catch {
      showErrorToast();
    }
  }, [getCheckListData]);

  const handleEditCheckList = useCallback(async () => {
    if (isFromCategory && description.length === 0) {
      navigation.goBack();
      return;
    }

    if (isEdit && checkListId) {
      await handleUpdateCheckList();
      navigation.goBack();
      return;
    }

    const newCheckListId = await handleAddCheckList();
    if (!newCheckListId) {
      showErrorToast();
      return;
    }

    if (fromNavigator === "CalendarHome") {
      navigation.goBack();
    } else {
      navigation.replace("EditCost", { checkListId: newCheckListId, isFromCheckList: true, fromNavigator });
    }
  }, [getCheckListData]);

  const bottomLabel = useMemo(() => {
    if (isEdit) {
      return "수정";
    }
    if (isFromCategory && description.length === 0) {
      return "다음에";
    }

    return "저장";
  }, [isEdit, isFromCategory, description]);

  const buttonDisabled = useMemo(() => {
    if (isFromCategory && description.length === 0 && !loading) {
      return false;
    }

    return description.length === 0 || loading;
  }, [isEdit, isFromCategory, description]);

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
      !reservedDate && {
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
      <BottomButton label={bottomLabel} disabled={buttonDisabled} onPress={handleEditCheckList} />
    </WhiteSafeAreaView>
  );
};
