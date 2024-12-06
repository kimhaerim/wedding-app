import { SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { color } from "../../enum";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Button
        title="Hello, I am your cat!"
        onPress={() => console.log("ddd")}
        backgroundColor={color.DARK_GRAY}
      ></Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
