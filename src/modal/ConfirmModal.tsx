import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Text } from "react-native-paper";
import Button from "../components/common/Button";
import { Color } from "../enum";

interface modalProps {
  title: string;
  description?: string;
  visible: boolean;
  hideModal: () => void;
}

const ConfirmModal: React.FC<modalProps> = (props) => {
  const { title, description, visible, hideModal } = props;

  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.contentContainerStyle]}>
      <Text style={[styles.titleStyle]}>{title}</Text>
      {description && <Text style={[styles.descriptionStyle]}>{description}</Text>}

      <View style={[styles.buttonContainer]}>
        <Button
          style={[
            styles.button,
            {
              marginRight: 10,
              borderColor: Color.GRAY,
              backgroundColor: Color.GRAY,
            },
          ]}
          onPress={hideModal}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>아니오</Text>
        </Button>

        <Button style={[styles.button, { borderColor: Color.WHITE, backgroundColor: Color.BLUE }]} onPress={hideModal}>
          <Text style={{ fontSize: 16, color: Color.WHITE, fontWeight: "bold" }}>네</Text>
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: Color.WHITE,
    padding: 20,
    width: 350,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionStyle: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: 100,
    borderWidth: 1,
  },
});

export default ConfirmModal;
