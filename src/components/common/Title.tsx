import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface TitleProps {
  label: string;
}

const Title: React.FC<TitleProps> = ({ label }) => <Text style={[styles.labelStyle]}>{label}</Text>;

const styles = StyleSheet.create({
  labelStyle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
});
export default Title;
