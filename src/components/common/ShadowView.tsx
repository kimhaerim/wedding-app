import React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "../../enum";

interface ShadowViewProps {
  children: React.ReactNode;
}

const ShadowView: React.FC<ShadowViewProps> = (props) => <View style={styles.container}>{props.children}</View>;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    shadowColor: Color.DARK_GRAY,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ShadowView;
