import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color } from "../../enum";

const BOTTOM_APPBAR_HEIGHT = 50;

interface ButtonProps {
  label: string;
  disabled: boolean;
  onPress: () => void;
}

const BottomButton: React.FC<ButtonProps> = (props) => {
  const { label, disabled, onPress } = props;
  const { bottom } = useSafeAreaInsets();

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: Color.WHITE,
        },
      ]}
    >
      <Button
        mode="contained"
        onPress={onPress}
        buttonColor={Color.BLUE}
        disabled={disabled}
        style={[styles.buttonStyle]}
      >
        {label}
      </Button>
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    backgroundColor: "aquamarine",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonStyle: {
    height: 40,
    width: "90%",
    borderRadius: 12,
  },
});

export default BottomButton;
