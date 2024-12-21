import React from "react";

import { Appbar } from "react-native-paper";

interface BackButtonProps {
  onPress: () => void;
}

const CancelButton: React.FC<BackButtonProps> = (props) => {
  return (
    <Appbar.Header style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Appbar.Action onPress={props.onPress} icon="close" />
    </Appbar.Header>
  );
};

export default CancelButton;
