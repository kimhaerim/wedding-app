import { useState } from "react";
import { ICheckList, ICost, ICostByCheckList } from "../../interface";
import { checkListMockData1 } from "../../mock/CheckListMockData";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import BackButton from "../../components/common/BackButton";
import Badge from "../../components/common/Badge";
import CheckBox from "../../components/common/CheckBox";
import { Divider, Text } from "react-native-paper";
import { convertDateTimeToString } from "../../common/util";
import { Color } from "../../enum";
import BudgetSummaryRow from "../../components/cost/BudgetSummaryRow";
import ShadowView from "../../components/common/ShadowView";
import CostItem from "../../components/cost/CostItem";
import ConfirmModal from "../../modal/ConfirmModal";
import FloatingButton from "../../components/common/FloatingButton";

const CheckList = () => {
  const [costId, setCostId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [checkList, setCheckList] = useState<ICheckList>(checkListMockData1[0]);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  const [combinedCost, setCombinedCost] = useState<ICostByCheckList>({
    totalCost: 200000,
    paidCost: 100000,
    unpaidCost: 100000,
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
    <SafeAreaView>
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

        <View style={{ flexDirection: "row", alignItems: "center" }}></View>
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
              <BudgetSummaryRow
                iconSource="cash"
                label="총 예산"
                value={checkList.category.budgetAmount}
              ></BudgetSummaryRow>
            )}

            <BudgetSummaryRow
              iconSource="currency-usd"
              label="총 비용"
              value={combinedCost.totalCost}
            ></BudgetSummaryRow>

            <Divider style={{ margin: 5 }} />

            <BudgetSummaryRow
              iconSource="check-circle"
              label="결제 금액"
              value={combinedCost.paidCost}
            ></BudgetSummaryRow>
            <BudgetSummaryRow
              iconSource="clock-outline"
              label="결제 예정 금액"
              value={combinedCost.unpaidCost}
            ></BudgetSummaryRow>

            {checkList.category && (
              <>
                <Divider style={{ margin: 5 }} />
                <BudgetSummaryRow
                  iconSource="wallet-outline"
                  label="남은 예산"
                  value={checkList.category.budgetAmount - combinedCost.totalCost}
                  valueStyle={{
                    color: checkList.category.budgetAmount - combinedCost.totalCost < 0 ? Color.RED : Color.BLACK,
                    fontWeight: "bold",
                  }}
                ></BudgetSummaryRow>
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
    </SafeAreaView>
  );
};

export default CheckList;
