import { Button, SafeAreaView } from "react-native";
import { Color } from "../../enum";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Button
        title="Hello, I am your cat!"
        onPress={() => console.log("ddd")}
        backgroundColor={Color.DARK_GRAY}
      ></Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
