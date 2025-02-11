import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { Color } from "../../enum";
import Row from "./Row";

interface MonthlySummaryProps {
  currentMonth: number;
  checkListCount: {
    allCount: number;
    completedCount: number;
    incompleteCount: number;
  };
  paymentSummary: {
    completedAmount: number;
    pendingAmount: number;
  };
}

const MonthlySummary: React.FC<MonthlySummaryProps> = (props) => {
  const { currentMonth, checkListCount, paymentSummary } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.headerText}>
          {currentMonth}월 요약 {isExpanded ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <>
          <Row style={styles.row}>
            <Text style={styles.boldText}>체크리스트</Text>
            <Text style={styles.rightAlignedText}>{checkListCount.allCount}개</Text>
          </Row>
          <Row style={styles.row}>
            <Text style={styles.boldText}>완료</Text>
            <Text style={styles.rightAlignedText}>{checkListCount.completedCount}개</Text>
          </Row>
          <Row style={styles.row}>
            <Text style={styles.boldText}>미완료</Text>
            <Text style={styles.rightAlignedText}>{checkListCount.incompleteCount}개</Text>
          </Row>

          <Divider style={styles.divider} />

          <Text style={{ ...styles.boldText, marginVertical: 8 }}>지불 내역</Text>

          <Row style={styles.row}>
            <Text style={styles.boldText}>완료</Text>
            <Text style={styles.rightAlignedText}>{paymentSummary.completedAmount.toLocaleString()}원</Text>
          </Row>
          <Row style={styles.row}>
            <Text style={styles.boldText}>미완료</Text>
            <Text style={styles.rightAlignedText}>{paymentSummary.pendingAmount.toLocaleString()}원</Text>
          </Row>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: Color.BLUE100,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    marginVertical: 8,
  },
  boldText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  rightAlignedText: {
    fontSize: 12,
    textAlign: "right",
    marginRight: 15,
  },
  divider: {
    backgroundColor: Color.DARK_GRAY,
  },
});

export default MonthlySummary;
