import { Divider, Text } from "react-native-paper";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import { ICheckList, ICheckListTemp, ICost } from "../../interface/check-list.interface";
import { Color } from "../../enum";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ICouple } from "../../interface/couple.interface";
import dayjs from "dayjs";
import React, { useState } from "react";
import { checkListMockData1, coupleMockData } from "../../mock/CheckListMockData";
import ConfirmModal from "../../modal/ConfirmModal";
import FloatingButton from "../../components/FloatingButton";

import BackButton from "../../components/BackButton";
import CheckBox from "../../components/CheckBox";
import CustomMenu from "../../components/common/Menu";
import Row from "../../components/Row";

const CheckList = () => {
  const today = dayjs();
  // const [selectedCategory, setSelectedCategory] = useState<number>(0);s

  const [costId, setCostId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [checkList, setCheckList] = useState<ICheckList>(checkListMockData1[0]);
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  // const [userCategories, setUserCategories] = useState<{ id: number; category: string }[]>(userCategoriesMockData);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const convertDateToString = (inputDate: Date) => {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const date = inputDate.getDate();
    return `${year}년 ${month}월 ${date}일`;
  };

  const calculateDday = (date: Date) => {
    const targetDate = dayjs(date);
    const daysFromStart = today.diff(targetDate, "day");
    return daysFromStart;
  };

  const handleMenuButtonPress = (id: number | undefined) => {
    setCostId(id);
  };

  const handleMenuItemPress = (action: string, id: number) => {
    switch (action) {
      case "view":
        console.log("상세 보기", id);
        break;
      case "edit":
        console.log("수정", id);
        break;
      case "delete":
        console.log("삭제", id);
        setRemoveModalVisible(true);
        setCostId(undefined);
        break;
      default:
        break;
    }
  };

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);

    // 추가 호출 API
    const newCost: ICost[] = [];

    if (newCost.length > 0) {
      // setCosts((prevLists) => [...prevLists, ...newCheckLists]);
    }

    if (newCost.length <= 10) {
      setPage(-1);
    }
  };

  return (
    <CenteredSafeArea>
      <BackButton onPress={() => console.log("뒤로 가기")} label="체크리스트"></BackButton>
      <View style={{ margin: 20 }}>
        <CheckBox
          label={checkList.description}
          isChecked={checkList.isCompleted}
          onPress={() => "클릭"}
          labelStyle={{ fontWeight: "bold", fontSize: 18 }}
        ></CheckBox>
        <View style={styles.menuContainer}></View>
        {checkList.reservedDate && (
          <Text style={{ color: Color.DARK_GRAY, marginBottom: 5 }}>{convertDateToString(checkList.reservedDate)}</Text>
        )}
        {checkList.memo && <Text style={{ fontSize: 12 }}>{checkList.memo}</Text>}
        {checkList.status && <Text>{checkList.status}</Text>}

        <View style={{ height: "100%", marginTop: 10 }}>
          <FlatList
            data={checkList.costs}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <View style={styles.shadowView}>
                <View
                  style={{
                    backgroundColor: item.paymentDate ? Color.BLUE : Color.DARK_GRAY,
                    padding: 5,
                    borderRadius: 5,
                    width: 60,
                  }}
                >
                  <Text style={{ color: Color.WHITE, fontSize: 12, textAlign: "center" }}>
                    {item.paymentDate ? "결제 완료" : "결제 전"}
                  </Text>
                </View>
                <View style={styles.checkListRow}>
                  {item.title && <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</Text>}

                  <View style={styles.menuContainer}>
                    <CustomMenu
                      visible={costId === item.id}
                      onButtonPress={() => setCostId(item.id)}
                      onDismiss={() => setCostId(undefined)}
                      onMenuItemPress={(action: string) => handleMenuItemPress(action, item.id)}
                    />
                  </View>
                </View>

                {item.paymentDate && <Text style={styles.dateText}> {convertDateToString(item.paymentDate)}</Text>}

                {item.memo && (
                  <>
                    <Divider />
                    <Text style={styles.memoText}>{item.memo}</Text>
                  </>
                )}
              </View>
            )}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>

      <FloatingButton onPress={() => console.log()}></FloatingButton>
    </CenteredSafeArea>
  );
};

const styles = StyleSheet.create({
  checkListContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: Color.WHITE,
  },
  shadowView: {
    padding: 10,
    margin: 5,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    shadowColor: Color.DARK_GRAY,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkListRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    color: Color.BLUE,
  },
  dateText: {
    color: Color.DARK_GRAY,
    marginBottom: 5,
  },
  memoText: {
    marginTop: 10,

    fontSize: 12,
  },
});

export default CheckList;
