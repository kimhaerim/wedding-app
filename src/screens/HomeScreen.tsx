import { SafeAreaView } from "react-native";
import Button from "../components/Button";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Button title="Hello, I am your cat!" onPress={() => console.log("ddd")} primary></Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
