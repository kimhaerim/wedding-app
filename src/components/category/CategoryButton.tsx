import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Color } from "../../enum";

interface ICategoryButtonProps {
  onPress: () => void;
  isPressed: boolean;
  label: string;
}

export const CategoryButton: React.FC<ICategoryButtonProps> = ({ onPress, isPressed, label }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        {
          backgroundColor: isPressed ? Color.BLUE200 : "#F2F2F2",
          paddingHorizontal: label.length > 3 ? 15 : 10,
        },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: isPressed ? Color.BLACK : Color.DARK_GRAY }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
});

export default CategoryButton;
