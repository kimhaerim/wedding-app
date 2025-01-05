import React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { Text } from "react-native-paper";
import { Color } from "../../enum";

interface BadgeProps {
  backgroundColor: Color;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}

const Badge: React.FC<BadgeProps> = (props) => {
  const { backgroundColor, label, labelStyle } = props;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[labelStyle, { textAlign: "center" }]} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    maxWidth: 100,
  },
});

export default Badge;
