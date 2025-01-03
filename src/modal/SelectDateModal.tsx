import * as React from "react";
import { Modal, Text } from "react-native-paper";
import { Color } from "../enum";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../components/common/Button";
import DatePicker from "../components/common/DatePicker";

interface SelectDateModalProps {
  title: string;
  visible: boolean;
  dateValue?: Date;
  onDateChange: (date?: Date) => void;
  hideModal: () => void;
}

const SelectDateModal: React.FC<SelectDateModalProps> = ({ title, visible, dateValue, onDateChange, hideModal }) => {
  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.contentContainerStyle]}>
      <Text style={[styles.titleStyle]}>{title}</Text>

      <View style={{ margin: 40 }}>
        <DatePicker label="날짜" value={dateValue} onChange={onDateChange} />
      </View>

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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    borderWidth: 1,
  },
});

export default SelectDateModal;
