import React from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Color } from "../../enum";

interface WhiteSafeAreaViewProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const WhiteSafeAreaView: React.FC<WhiteSafeAreaViewProps> = (props) => (
  <SafeAreaView style={[styles.container, props.style]}>{props.children}</SafeAreaView>
);

const styles = StyleSheet.create({
  container: { backgroundColor: Color.WHITE, flex: 1 },
});

export default WhiteSafeAreaView;
