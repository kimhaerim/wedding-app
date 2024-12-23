import { TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { Color } from "../enum";

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, label, onPress }) => {
  const color = isChecked ? Color.BLUE : Color.GRAY;

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 25,
          height: 25,
          borderRadius: 0,
          justifyContent: "center",
          alignItems: "center",
          flex: 0,
        }}
      >
        <Icon source="check" size={18} color={color} />
      </TouchableOpacity>
      <Text style={{ fontSize: 15, fontWeight: "bold", flex: 1, marginLeft: 10 }}>{label}</Text>
    </>
  );
};

export default CheckBox;
