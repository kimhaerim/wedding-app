import { View } from "react-native";

import { Text } from "react-native-paper";
import { Color } from "../../enum";
import Row from "./Row";

interface SummaryCardProps {
  title: string;
  data: { total: string; items: { label: string; value: string }[] };
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, data }) => (
  <View
    style={{
      marginTop: 10,
      backgroundColor: Color.BLUE100,
      padding: 20,
      borderRadius: 20,
      marginBottom: 20,
    }}
  >
    <Row style={{ marginBottom: 8 }}>
      <Text style={{ fontSize: 12, flex: 0, fontWeight: "bold" }}>{title}</Text>
      <Text style={{ fontSize: 12, flex: 1, textAlign: "right", marginRight: 15 }}>{data.total}</Text>
    </Row>
    {data.items.map((item, index) => (
      <Row key={index} style={{ marginBottom: index !== data.items.length - 1 ? 8 : 0 }}>
        <Text style={{ fontSize: 12, flex: 0, fontWeight: "bold" }}>{item.label}</Text>
        <Text style={{ fontSize: 12, flex: 1, textAlign: "right", marginRight: 15 }}>{item.value}</Text>
      </Row>
    ))}
  </View>
);

export default SummaryCard;
