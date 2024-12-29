import React from "react";
import { Color } from "../enum";
import { StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BOTTOM_APPBAR_HEIGHT = 80;

interface ButtonProps {
  label: string;
  disabled: boolean;
  onPress: () => void;
}

const BottomButton: React.FC<ButtonProps> = (props) => {
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
      safeAreaInsets={{ bottom }}
    >
      <Button
        mode="contained"
        onPress={props.onPress}
        buttonColor={Color.BLUE}
        disabled={props.disabled}
        style={{
          width: "90%",
          borderRadius: 12,
        }}
      >
        {props.label}
      </Button>
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "aquamarine",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: "absolute",
    right: 16,
  },
});

export default BottomButton;
