import Modal from "react-native-modal";
import { ICheckList, ICost } from "../interface";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ShadowView from "../components/common/ShadowView";
import CheckBox from "../components/common/CheckBox";
import Badge from "../components/common/Badge";
import CustomMenu from "../components/common/Menu";
import { Text } from "react-native-paper";
import { convertDateTimeToString, convertDateToString, covertCostType, formatCurrency } from "../common/util";
import { Color } from "../enum";
import Button from "../components/common/Button";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CalendarStackParamList } from "../navigation/types";
import CheckListItem from "../components/check-list/CheckListItem";
import Row from "../components/common/Row";

interface CostDayDetailModalProps {
  isVisible: boolean;
  costs: ICost[];
  selectedDate: string;
  onHide: () => void;
}

type CheckListNavigationProp = StackNavigationProp<CalendarStackParamList, "CheckListDetail">;

const CostDayDetailModal: React.FC<CostDayDetailModalProps> = ({ isVisible, costs, selectedDate, onHide }) => {
  const navigation = useNavigation<CheckListNavigationProp>();

  const handleCheckListPress = (id: number) => {
    onHide();
    // navigation.navigate("CostDetail", { id });
  };

  const handleAddCheckListPress = () => {
    onHide();
    navigation.navigate("EditCost", { id: undefined });
  };

  const formattedDate = useMemo(() => convertDateToString(new Date(selectedDate)), [selectedDate]);

  const renderItem = (item: ICost) => {
    return (
      <ShadowView>
        <TouchableOpacity onPress={() => handleCheckListPress(item.id)} key={`cost-${item.id}`}>
          <Row>
            <Text style={{ fontSize: 10 }}>{covertCostType(item.costType)}</Text>
            <Text style={{ fontSize: 10, marginLeft: 10, color: item.paymentDate ? Color.BLUE : Color.RED }}>
              {item.paymentDate ? "결제 완료" : "결제 전"}
            </Text>
          </Row>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text>{item.title}</Text>
            <Text style={{ textAlign: "right" }}>{formatCurrency(item.amount)}</Text>
          </View>
        </TouchableOpacity>
      </ShadowView>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onHide}
      style={styles.bottomModal}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}
    >
      <View style={{ ...styles.modalContent, height: costs.length > 0 ? "50%" : "15%" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>
          {formattedDate} 체크리스트
        </Text>
        {costs.length > 0 ? (
          <View>
            <FlatList data={costs} keyExtractor={(item) => `${item.id}`} renderItem={({ item }) => renderItem(item)} />
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
              <Button onPress={onHide} style={{ backgroundColor: Color.GRAY, width: "50%" }}>
                <Text>닫기</Text>
              </Button>
            </View>
          </View>
        ) : (
          <Button style={{ marginBottom: 30 }} onPress={handleAddCheckListPress}>
            <Text>새로운 지불 내역 추가하기</Text>
          </Button>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  dateText: {
    color: Color.DARK_GRAY,
    fontSize: 11,
    marginBottom: 5,
  },
});

export default CostDayDetailModal;
