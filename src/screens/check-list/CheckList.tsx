import { Divider, Icon, Text } from "react-native-paper";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import { ICheckList, ICost } from "../../interface/check-list.interface";
import { Color } from "../../enum";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { checkListMockData1 } from "../../mock/CheckListMockData";
import ConfirmModal from "../../modal/ConfirmModal";
import FloatingButton from "../../components/FloatingButton";

import BackButton from "../../components/BackButton";
import CheckBox from "../../components/CheckBox";
import { Badge } from "../../components/common/Badge";
import { convertDateTimeToString, formatCurrency } from "../../common/util";
import CostItem from "../../components/cost/CostItem";
import { ICostByCheckList } from "../../interface/cost.interface";
import Row from "../../components/Row";
import ShadowView from "../../components/common/ShadowView";

const CheckList = () => {
  const [costId, setCostId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [checkList, setCheckList] = useState<ICheckList>(checkListMockData1[0]);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  const [combinedCost, setCombinedCost] = useState<ICostByCheckList>({
    totalAmount: 200000,
    paidAmount: 100000,
    unpaidAmount: 100000,
  });
  const [isExpanded, setIsExpanded] = useState(false); // 열림/닫힘 상태 관리

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
        {checkList.category && <Badge label={checkList.category.title} backgroundColor={Color.BLUE200}></Badge>}

        <CheckBox
          style={{ marginTop: 10 }}
          label={checkList.description}
          isChecked={checkList.isCompleted}
          onPress={() => "클릭"}
          labelStyle={{ fontWeight: "bold", fontSize: 18 }}
        ></CheckBox>

        <View style={styles.menuContainer}></View>
        {checkList.reservedDate && (
          <Text style={{ color: Color.DARK_GRAY, marginBottom: 5 }}>
            {convertDateTimeToString(checkList.reservedDate)}
          </Text>
        )}
        {checkList.memo && <Text style={{ fontSize: 12, marginBottom: 10 }}>{checkList.memo}</Text>}
      </View>

      <Divider />
      <View
        style={{
          backgroundColor: Color.WHITE,
          margin: 10,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          borderColor: Color.BLUE200,
        }}
      >
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: Color.BLUE }}>
            예산 / 지출 내역 {isExpanded ? "닫기" : "보기"}
          </Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={{ margin: 5 }}>
            {checkList.category && (
              <Row style={{ marginBottom: 5 }}>
                <Icon color={Color.DARK_GRAY} source="cash" size={15} />
                <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>총 예산</Text>
                <Text style={{ fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 }}>
                  {formatCurrency(checkList.category.budgetAmount)}
                </Text>
              </Row>
            )}
            <Row style={{ marginBottom: 5 }}>
              <Icon color={Color.DARK_GRAY} source="currency-usd" size={15} />
              <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>총 비용</Text>
              <Text style={{ fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 }}>
                {formatCurrency(combinedCost.totalAmount)}
              </Text>
            </Row>

            <Divider style={{ margin: 5 }} />
            <Row style={{ marginBottom: 5 }}>
              <Icon color={Color.DARK_GRAY} source="check-circle" size={15} />
              <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>결제 금액</Text>
              <Text style={{ fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 }}>
                {formatCurrency(combinedCost.paidAmount)}
              </Text>
            </Row>

            <Row style={{ marginBottom: 5 }}>
              <Icon color={Color.DARK_GRAY} source="clock-outline" size={15} />
              <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>결제 예정 금액</Text>
              <Text style={{ fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 }}>
                {formatCurrency(combinedCost.unpaidAmount)}
              </Text>
            </Row>

            {checkList.category && (
              <>
                <Divider />
                <Row style={{ marginTop: 5 }}>
                  <Icon color={Color.DARK_GRAY} source="wallet-outline" size={15} />
                  <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>남은 예산</Text>
                  <Text
                    style={{
                      fontSize: 13,
                      flex: 1,
                      textAlign: "right",
                      marginRight: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {formatCurrency(checkList.category.budgetAmount - combinedCost.totalAmount)}
                  </Text>
                </Row>
              </>
            )}
          </View>
        )}
      </View>

      <View style={{ margin: 10, marginTop: 0 }}>
        <FlatList
          data={checkList.costs}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <ShadowView>
              <CostItem
                item={item}
                costId={costId}
                onMenuButtonPress={() => setCostId(item.id)}
                onMenuItemPress={handleMenuItemPress}
              />
            </ShadowView>
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
        />
      </View>

      <ConfirmModal
        title="비용 정보를 정말 삭제하시겠습니까?"
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
