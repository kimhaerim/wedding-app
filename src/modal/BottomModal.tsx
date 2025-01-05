import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

interface BottomModalProps {
  visible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
  height: number;
}

const BottomModal: React.FC<BottomModalProps> = (props) => {
  const { visible, hideModal, children, height } = props;
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={hideModal}
      style={styles.bottomModal}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
    >
      <View style={[styles.modalContent, { height: `${height}%` }]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottomModal;
