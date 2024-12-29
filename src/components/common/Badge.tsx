import { StyleProp, TextStyle, View } from "react-native";
import { Color } from "../../enum";
import React from "react";
import { Text } from "react-native-paper";

interface BadgeProps {
  backgroundColor: Color;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({ backgroundColor, label, labelStyle }) => {
  return (
    <View
      style={{
        backgroundColor,
        padding: 5,
        borderRadius: 5,
        alignSelf: "flex-start",
        maxWidth: 100,
      }}
    >
      <Text style={[labelStyle, { textAlign: "center" }]} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </View>
  );
};
