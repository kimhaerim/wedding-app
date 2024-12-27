import * as React from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";
import { Color } from "../enum";
import Row from "../components/Row";
import { TouchableOpacity, View } from "react-native";

interface modalProps {
  title: string;
  description: string;
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
      <Text style={{ marginTop: 10, fontSize: 16, textAlign: "center" }}>{description}</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Color.GRAY,
            justifyContent: "center",
            alignItems: "center",
            flex: 0,
            marginRight: 10,
          }}
          onPress={hideModal}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>아니오</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            flex: 0,
            borderColor: Color.WHITE,
            backgroundColor: Color.BLUE,
          }}
          onPress={() => console.log("삭제")}
        >
          <Text style={{ fontSize: 16, color: Color.WHITE, fontWeight: "bold" }}>네</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
