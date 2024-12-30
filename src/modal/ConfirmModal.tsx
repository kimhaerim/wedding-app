import * as React from "react";
import { Modal, Text } from "react-native-paper";
import { Color } from "../enum";
import { TouchableOpacity, View } from "react-native";
import Button from "../components/Button";

interface modalProps {
  title: string;
  description?: string;
  visible: boolean;
  hideModal: () => void;
}

const ConfirmModal: React.FC<modalProps> = ({ title, description, visible, hideModal }) => {
  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={{
        backgroundColor: Color.WHITE,
        padding: 20,
        width: 350,
        height: 200,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>{title}</Text>
      {description && <Text style={{ marginTop: 10, fontSize: 16, textAlign: "center" }}>{description}</Text>}

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <Button
          style={{
            width: 100,
            borderWidth: 1,
            marginRight: 10,
            borderColor: Color.GRAY,
            backgroundColor: Color.GRAY,
          }}
          onPress={hideModal}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>아니오</Text>
        </Button>

        <Button
          style={{
            width: 100,
            borderWidth: 1,
            borderColor: Color.WHITE,
            backgroundColor: Color.BLUE,
          }}
          onPress={hideModal}
        >
          <Text style={{ fontSize: 16, color: Color.WHITE, fontWeight: "bold" }}>네</Text>
        </Button>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
