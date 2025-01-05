import { Button, Divider, Icon, Menu } from "react-native-paper";
import { Color } from "../../enum";

interface MenuProps {
  visible: boolean;
  onDismiss: () => void;
  onButtonPress: () => void;
  onMenuItemPress: (action: string) => void;
}

const CustomMenu: React.FC<MenuProps> = (props) => {
  const { visible, onDismiss, onButtonPress, onMenuItemPress } = props;
  const handleMenuItemPress = (action: string) => {
    onMenuItemPress(action);
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
