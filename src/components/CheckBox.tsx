import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";
import { Color } from "../enum";

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
  label: string;
  labelStyle?: Object;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, onPress, label, labelStyle }) => {
  const color = isChecked ? Color.BLUE : Color.GRAY;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.checkBox, { borderColor: Color.GRAY }]}>
        {isChecked && <Icon source="check" size={18} color={color} />}
      </TouchableOpacity>

      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkBox: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
  },
  label: {
    fontSize: 15,
    marginLeft: 10,
    color: Color.BLACK,
  },
});

export default CheckBox;
