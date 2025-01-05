import { Appbar } from "react-native-paper";

interface BackButtonProps {
  onPress: () => void;
  label: string;
}

const BackButton: React.FC<BackButtonProps> = (props) => {
  const { onPress, label } = props;
  return (
    <Appbar.Header style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Appbar.BackAction onPress={onPress} />
      <Appbar.Content title={label} titleStyle={{ fontSize: 15 }} />
    </Appbar.Header>
  );
};

export default BackButton;
