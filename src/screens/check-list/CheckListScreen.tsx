import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { convertDateTimeToString } from "../../common/util";
import Badge from "../../components/common/Badge";
import CheckBox from "../../components/common/CheckBox";
import FloatingButton from "../../components/common/FloatingButton";
import ShadowView from "../../components/common/ShadowView";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import CostItem from "../../components/cost/CostItem";
import { Color } from "../../enum";
import { ICheckList, ICost, ICostByCheckList } from "../../interface";
import { checkListMockData } from "../../mock/CheckListMockData";
import ConfirmModal from "../../modal/ConfirmModal";
import { CheckListStackParamList } from "../../navigation/interface";

import BudgetDetailModal from "../../modal/BudgetDetailModal";

import EditDeleteButtons from "../../components/common/EditDeleteButtons";

interface CheckListScreenProps {
  navigation: StackNavigationProp<CheckListStackParamList, "CheckListDetail" | "EditCheckList" | "CostDetail">;
  route: RouteProp<CheckListStackParamList, "CheckListDetail">;
}

const CheckListScreen: React.FC<CheckListScreenProps> = ({ route, navigation }) => {
  const { checkListId } = route.params;

  const [page, setPage] = useState<number>(0);
  const [checkList, setCheckList] = useState<ICheckList>(checkListMockData[0]);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  const [combinedCost, setCombinedCost] = useState<ICostByCheckList>({
    totalCost: 200000,
    paidCost: 100000,
    unpaidCost: 100000,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const [removeCheckListModalVisible, setRemoveCheckListModalVisible] = useState<boolean>(false);

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
    <WhiteSafeAreaView>
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
        {checkList.memo && <Text style={{ fontSize: 12 }}>{checkList.memo}</Text>}
      </View>

      <EditDeleteButtons
        onEditButtonPress={() =>
          navigation.navigate("EditCheckList", {
            checkListId,
            isFromCategory: checkList.category ? true : false,
          })
        }
        onRemoveButtonPress={() => setRemoveCheckListModalVisible(true)}
      />

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
        {checkList.category && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: Color.BLUE }}>
              예산 / 지출 내역 {isExpanded ? "닫기" : "보기"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ margin: 10, marginTop: 0, flex: 1 }}>
        <FlatList
          data={checkList.costs}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <ShadowView>
              <CostItem
                item={item}
                onCostPress={() => {
                  navigation.navigate("CostDetail", { costId: item.id });
                }}
              />
            </ShadowView>
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
        />
      </View>

      <FloatingButton onPress={() => console.log("추가하기 클릭")}></FloatingButton>

      <ConfirmModal
        title="비용 정보를 정말 삭제하시겠습니까?"
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>

      <ConfirmModal
        title="체크리스트 정보를 정말 삭제하시겠습니까?"
        visible={removeCheckListModalVisible}
        hideModal={() => setRemoveCheckListModalVisible(false)}
      ></ConfirmModal>

      {checkList.category && (
        <BudgetDetailModal
          visible={isExpanded}
          checkList={checkList}
          category={checkList.category}
          combinedCost={combinedCost}
          hideModal={() => setIsExpanded(false)}
        />
      )}
    </WhiteSafeAreaView>
  );
};

export default CheckListScreen;
