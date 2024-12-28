import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Color } from "../enum";
import { Icon } from "react-native-paper";

interface FloatingButtonProps {
  onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Icon source="plus" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 50,
    backgroundColor: Color.BLUE,
    borderRadius: 100,
  },
});

export default FloatingButton;
