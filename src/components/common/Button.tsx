import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Color } from "../../enum";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, onPress, style } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: Color.BLUE200,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
});

export default Button;
