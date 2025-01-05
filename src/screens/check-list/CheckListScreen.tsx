import { useState } from "react";
import { ICheckList, ICost, ICostByCheckList } from "../../interface";
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
import { CheckListStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { checkListMockData } from "../../mock/CheckListMockData";
import BottomButton from "../../components/common/BottomButton";
import BudgetDetailModal from "../../modal/BudgetDetailModal";
import Button from "../../components/common/Button";
import Row from "../../components/common/Row";

type CheckListNavigationProp = StackNavigationProp<CheckListStackParamList, "CheckListDetail">;
type CheckListRouteProp = RouteProp<CheckListStackParamList, "CheckListDetail">;

interface CheckListScreenProps {
  navigation: CheckListNavigationProp;
  route: CheckListRouteProp;
}

const CheckListScreen: React.FC<CheckListScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;

  const [costId, setCostId] = useState<number | undefined>(undefined);
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Button
          style={{ width: "50%" }}
          onPress={() =>
            navigation.navigate("EditCheckList", { checkListId: id, isFromCategory: checkList.category ? true : false })
          }
        >
          <Text>수정하기</Text>
        </Button>
        <Button
          style={{ width: "50%", marginLeft: 5, backgroundColor: Color.GRAY }}
          onPress={() => setRemoveCheckListModalVisible(true)}
        >
          <Text>삭제하기</Text>
        </Button>
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
                costId={costId}
                onCostPress={() => {
                  // navigation.navigate("CostDetail", { id: item.id });
                }}
                onMenuButtonPress={() => setCostId(item.id)}
                onMenuItemPress={handleMenuItemPress}
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
