import { Button, Divider, Icon, Menu } from "react-native-paper";
import ConfirmModal from "../../modal/ConfirmModal";
import { useState } from "react";
import { Color } from "../../enum";

interface MenuProps {
  visible: boolean;
  onDismiss: () => void;
  onButtonPress: () => void;
  onMenuItemPress: (action: string) => void; // 메뉴 항목을 눌렀을 때 부모로 알리는 콜백 함수
}

const CustomMenu: React.FC<MenuProps> = ({ visible, onDismiss, onButtonPress, onMenuItemPress }) => {
  const handleMenuItemPress = (action: string) => {
    onMenuItemPress(action); // 부모에 눌린 메뉴 항목을 알리기
  };

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={onDismiss}
        anchor={
          <Button onPress={onButtonPress} textColor={Color.BLACK}>
            <Icon source="menu" size={13} />
          </Button>
        }
        contentStyle={{ backgroundColor: Color.WHITE }}
      >
        <Menu.Item leadingIcon="eye" onPress={() => handleMenuItemPress("view")} title="상세 보기" />
        <Divider />
        <Menu.Item leadingIcon="pencil" onPress={() => handleMenuItemPress("edit")} title="수정" />
        <Menu.Item leadingIcon="delete" onPress={() => handleMenuItemPress("delete")} title="삭제" />
      </Menu>
    </>
  );
};
export default CustomMenu;
