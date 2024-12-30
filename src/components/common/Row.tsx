import React from "react";
import { View } from "react-native";

interface RowProps {
  children: React.ReactNode;
  style?: Object;
}

const Row: React.FC<RowProps> = ({ children, style }) => {
  const wrappedChildren = React.Children.map(children, (child, index) => <View style={{ flex: index }}>{child}</View>);
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", ...style }}>
      {wrappedChildren}
    </View>
  );
};

export default Row;
