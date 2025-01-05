import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { Text } from "react-native-paper";
import { Color } from "../../enum";

interface EditDeleteButtonsProps {
  onEditButtonPress: () => void;
  onRemoveButtonPress: () => void;
}

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({ onEditButtonPress, onRemoveButtonPress }) => {
  return (
    <View style={[styles.buttonContainer]}>
      <Button style={[styles.editButton]} onPress={onEditButtonPress}>
        <Text>수정하기</Text>
      </Button>
      <Button style={[styles.removeButton]} onPress={onRemoveButtonPress}>
        <Text>삭제하기</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  editButton: {
    width: "50%",
  },
  removeButton: {
    width: "50%",
    marginLeft: 5,
    backgroundColor: Color.GRAY,
  },
});

export default EditDeleteButtons;
