import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
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
import { ICheckList, ICostByCheckList } from "../../interface";
import ConfirmModal from "../../modal/ConfirmModal";
import { CheckListStackParamList } from "../../navigation/interface";

import BudgetDetailModal from "../../modal/BudgetDetailModal";

import { useQuery } from "@apollo/client";
import EditDeleteButtons from "../../components/common/EditDeleteButtons";
import { QueryGetCheckList } from "../../graphql/checkList";

interface CheckListScreenProps {
  navigation: StackNavigationProp<CheckListStackParamList, "CheckListDetail" | "EditCheckList" | "EditCost">;
  route: RouteProp<CheckListStackParamList, "CheckListDetail">;
}

export const CheckListScreen: React.FC<CheckListScreenProps> = ({ route, navigation }) => {
  const { checkListId } = route.params;

  const { data, refetch } = useQuery<{ checkList: ICheckList }, { id: number }>(QueryGetCheckList, {
    variables: { id: checkListId },
    fetchPolicy: "network-only",
  });

  const [costId, setCostId] = useState<number | undefined>(undefined);
  const [removeCostModalVisible, setRemoveCostModalVisible] = useState<boolean>(false);
  const [combinedCost, setCombinedCost] = useState<ICostByCheckList>({
    totalCost: 200000,
    paidCost: 100000,
    unpaidCost: 100000,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const [removeCheckListModalVisible, setRemoveCheckListModalVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const handleEditCost = useCallback(
    (costId: number) => {
      navigation.navigate("EditCost", { costId });
      setCostId(undefined);
    },
    [costId]
  );

  const handleRemoveCost = useCallback(() => {
    setRemoveCostModalVisible(true);
    setCostId(undefined);
  }, [costId]);

  return (
    <WhiteSafeAreaView>
      {data && (
        <>
          <View style={{ margin: 20 }}>
            {data.checkList.category && (
              <Badge label={data.checkList.category.title} backgroundColor={Color.BLUE200}></Badge>
            )}

            <CheckBox
              style={{ marginTop: 10 }}
              label={data.checkList.description}
              isChecked={data.checkList.isCompleted}
              onPress={() => "클릭"}
              labelStyle={{ fontWeight: "bold", fontSize: 18 }}
            ></CheckBox>

            <View style={{ flexDirection: "row", alignItems: "center" }}></View>
            {data.checkList.reservedDate && (
              <Text style={{ color: Color.DARK_GRAY, marginBottom: 5 }}>
                {convertDateTimeToString(data.checkList.reservedDate)}
              </Text>
            )}
            {data.checkList.memo && <Text style={{ fontSize: 12 }}>{data.checkList.memo}</Text>}
          </View>

          <EditDeleteButtons
            onEditButtonPress={() =>
              navigation.navigate("EditCheckList", {
                checkListId,
                isFromCategory: data.checkList.category ? true : false,
              })
            }
            onRemoveButtonPress={() => setRemoveCheckListModalVisible(true)}
          />

          <Divider />
          {data.checkList.category && (
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
            </View>
          )}

          <View style={{ margin: 10, marginTop: 0, flex: 1 }}>
            <FlatList
              data={data.checkList.costs}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <ShadowView>
                  <CostItem
                    item={item}
                    costId={costId}
                    onMenuButtonPress={() => setCostId(item.id)}
                    onEditButtonPress={() => handleEditCost(item.id)}
                    onDeleteButtonPress={handleRemoveCost}
                  />
                </ShadowView>
              )}
            />
          </View>

          <FloatingButton onPress={() => navigation.navigate("EditCost", { checkListId })}></FloatingButton>

          <ConfirmModal
            title="비용 정보를 정말 삭제하시겠습니까?"
            visible={removeCostModalVisible}
            hideModal={() => setRemoveCostModalVisible(false)}
          ></ConfirmModal>

          <ConfirmModal
            title="체크리스트 정보를 정말 삭제하시겠습니까?"
            visible={removeCheckListModalVisible}
            hideModal={() => setRemoveCheckListModalVisible(false)}
          ></ConfirmModal>

          {data.checkList.category && (
            <BudgetDetailModal
              visible={isExpanded}
              checkList={data.checkList}
              category={data.checkList.category}
              combinedCost={combinedCost}
              hideModal={() => setIsExpanded(false)}
            />
          )}
        </>
      )}
    </WhiteSafeAreaView>
  );
};
